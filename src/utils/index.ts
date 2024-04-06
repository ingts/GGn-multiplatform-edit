import {
  COLLECTIONS_SELECTORS,
  EXCLUDED_COLLECTION_IDS,
  EXCLUDED_LINKED_GROUPS,
  EXCLUDED_WEBLINKS,
  LINKED_GROUP_SELECTOR,
  TAGS_SELECTOR,
  TEXT_INSIDE_PARANTHESIS_REGEX,
  WEBLINKS_LABEL_URI_MAPPING,
  WEBLINKS_SELECTOR,
} from "../constants";
import { Link } from "../types";

export function filterLinkedGroups(
  linkedGroups: Link[],
  excludedLinkedGroups: string[],
) {
  return linkedGroups.filter(
    (linkedGroup) => !excludedLinkedGroups.includes(linkedGroup.title),
  );
}

export function filterCollections(
  collections: Link[],
  excludedCollectionIds: string[],
) {
  return collections.filter(
    (collection) => !excludedCollectionIds.includes(collection.id),
  );
}

export function filterWebLinks(weblinks: Link[], excludedWebLinkIds: string[]) {
  return weblinks.filter((weblink) => !excludedWebLinkIds.includes(weblink.id));
}

export function parseCollectionLinks(collectionsLinks: HTMLAnchorElement[]) {
  return collectionsLinks.map(({ href, innerText }) => {
    const id = getCollectionIdFromURL(href);

    return {
      id,
      title: `${innerText} (${id})`,
      href,
    };
  });
}

export function getCollectionLinks() {
  const collectionsRaw = document.querySelectorAll<HTMLAnchorElement>(
    COLLECTIONS_SELECTORS.join(","),
  );

  return filterCollections(
    parseCollectionLinks(Array.from(collectionsRaw)),
    EXCLUDED_COLLECTION_IDS,
  );
}

export function getTags() {
  const tagsRaw = document.querySelectorAll<HTMLAnchorElement>(TAGS_SELECTOR);

  return Array.from(tagsRaw).map(({ innerText }) => ({
    title: innerText,
    id: innerText,
  }));
}

export function getWebLinks() {
  const weblinksRaw =
    document.querySelectorAll<HTMLAnchorElement>(WEBLINKS_SELECTOR);

  return filterWebLinks(
    Array.from(weblinksRaw).map(({ title, href }) => ({
      title,
      href,
      id: title,
    })),
    EXCLUDED_WEBLINKS,
  );
}

export function getCurrentLinkedGroup(
  currentLinkedGroup: HTMLDivElement | null,
) {
  if (!currentLinkedGroup) {
    throw new Error("Markup must have changed.");
  }

  return {
    title: currentLinkedGroup.title.match(TEXT_INSIDE_PARANTHESIS_REGEX)![1],
    id: getCollectionIdFromURL(window.location.href),
  };
}

export function getLinkedGroups() {
  const linkedGroupsRaw = document.querySelectorAll<HTMLDivElement>(
    LINKED_GROUP_SELECTOR,
  );

  const regex = TEXT_INSIDE_PARANTHESIS_REGEX;

  return filterLinkedGroups(
    Array.from(linkedGroupsRaw)
      .filter((grouplink) => grouplink.title.match(regex))
      .map((grouplink) => ({
        title: grouplink.title.match(regex)![1],
        href: (grouplink.parentNode as HTMLAnchorElement).href,
        id: getCollectionIdFromURL(
          (grouplink.parentNode as HTMLAnchorElement).href,
        ),
      })),
    EXCLUDED_LINKED_GROUPS,
  );
}

export function getCollectionIdFromURL(url: string) {
  const regex = /\bid=(\d+)\b/;
  const match = regex.exec(url);

  if (match) {
    return match[1];
  } else {
    throw new Error("ID not found in the URL.");
  }
}

/**
 * Generates a URLSearchParams object based on provided web links and form data.
 *
 * @param {Link[]} weblinks An array of weblinks of source linked group.
 * @param linkedGroupWeblinksFormData  {FormData} The FormData object we get from the destination linked group's Non-wiki edit form.
 * @returns {Promise<URLSearchParams>} A promise that resolves to a URLSearchParams Object which acts as the payload for nonwikiedit action.
 */
export async function getWebLinksPayload(
  weblinks: Link[],
  linkedGroupWeblinksFormData: FormData,
): Promise<URLSearchParams> {
  // Clone the provided FormData object, don't want to edit the original
  const formData = cloneFormData(linkedGroupWeblinksFormData);

  // Iterate through the weblinks array
  for (const { id, href } of weblinks) {
    // uriLabel refers to the weblink
    const uriLabel = getKeyByValue(WEBLINKS_LABEL_URI_MAPPING, id);

    /* If no URI label is found, skip to the next weblink
     *  Check WEBLINKS_LABEL_URI_MAPPING if you think a link is being skipped, a mapping might not be present there
     */
    if (!uriLabel) {
      continue;
    }

    // Get the value for that URI label from the FormData
    const value = formData.get(uriLabel);

    /**
     * If the value associated with the URI label is not found in the FormData, skip to the next iteration.
     * This means that the destination linked group doesn't have that field.
     */
    if (value === null) {
      continue;
    }

    /**
     * If the value associated with the URI label is an empty string in the FormData,
     * update it with the href from the weblink.
     * This means that the destination linked group has that field, but it's empty.
     */
    if (value === "") {
      formData.set(uriLabel, href);
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // Don't ask, it just works.
  const urlSearchParams = new URLSearchParams(formData);

  return urlSearchParams;
}

export function getKeyByValue(object: object, value: string) {
  return Object.keys(object).find((key) => object[key] === value);
}

export function cloneFormData(formData: FormData) {
  const clone = new FormData();

  for (const [key, value] of formData) {
    clone.set(key, value);
  }

  return clone;
}

export function xmlhttpRequestPromisified<T>(
  options: Pick<GMType.XHRDetails<T>, "url" | "method" | "headers">,
) {
  return new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      ...options,
      onload(response) {
        resolve(response);
      },
      onerror(response) {
        reject(response);
      },
    });
  });
}
