import {
  DELETE_TAGS_SELECTOR,
  GAMEFAQ_PLATFORM_LINK_SELECTOR,
  GAMEFAQ_PLATFORM_MAPPING,
  GAMEFAQ_URL,
} from "../constants";
import { Link } from "../types";
import { getWebLinksPayload, xmlhttpRequestPromisified } from "../utils";

const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");

/**
 * Batch add linked groups to a collection
 *
 */
export async function addTorrentsToCollection(
  collectionId: string,
  urls: string[],
): Promise<boolean> {
  try {
    const response = await fetch("collections.php", {
      method: "POST",
      credentials: "include",
      body: new URLSearchParams({
        action: "add_torrent_batch",
        auth: unsafeWindow["authkey"],
        collageid: collectionId,
        urls: urls.join("\r\n"),
      }),
      headers,
    });

    return response.ok;
  } catch (error) {
    console.error("addTorrentsToCollection failed", error);

    return false;
  }
}

export async function copyWeblinksToLinkedGroup(
  weblinks: Link[],
  linkedGroup: { title: string; id: string },
): Promise<boolean> {
  try {
    const linkedGroupWeblinksFormData = await getLinkedGroupNonWikiFormData(
      linkedGroup.id,
    );

    if (!linkedGroupWeblinksFormData) {
      throw new Error("linked group weblinks form data is null");
    }

    const gameFaqWeblink = weblinks.find(
      (weblink) => weblink.id === "GameFAQs",
    );

    if (gameFaqWeblink) {
      gameFaqWeblink.href =
        (await getGameFaqLinkByPlatform(
          gameFaqWeblink.href,
          linkedGroup.title,
        )) ?? "";
    }

    const payload = await getWebLinksPayload(
      weblinks,
      linkedGroupWeblinksFormData,
    );

    const response = await fetch("/torrents.php", {
      method: "POST",
      credentials: "include",
      body: payload,
      headers,
    });

    return response.ok;
  } catch (error) {
    console.error("copyWeblinksToLinkedGroup", error);

    return false;
  }
}

/**
 * Get FormData of NonWiki form
 *
 * @param linkedGroupId Group Id
 * @returns A FormData object of the Non-Wiki form
 */
export async function getLinkedGroupNonWikiFormData(
  linkedGroupId: string,
): Promise<FormData | null> {
  try {
    const response = await fetch(
      `https://gazellegames.net/torrents.php?action=editgroup&groupid=${linkedGroupId}`,
    );

    const rawHTML = await response.text();

    const parser = new DOMParser();

    const parsedHTML = parser.parseFromString(rawHTML, "text/html");

    const inputField = parsedHTML.querySelector<HTMLInputElement>(
      "input[value=nonwikiedit]",
    );
    const formElement = inputField?.parentNode as HTMLFormElement | undefined;

    if (!inputField || !formElement) {
      throw new Error("Markup has probably changed. Fix selector.");
    }

    return new FormData(formElement);
  } catch (error) {
    console.error("getLinkedGroupNonWikiFormData failed", error);

    return null;
  }
}

export async function getLinkedGroupDeletionTagsHref(
  linkedGroupId: string,
): Promise<string[]> {
  try {
    const response = await fetch(
      `https://gazellegames.net/torrents.php?id=${linkedGroupId}`,
    );

    const rawHTML = await response.text();

    const parser = new DOMParser();

    const parsedHTML = parser.parseFromString(rawHTML, "text/html");

    const anchorElements =
      parsedHTML.querySelectorAll<HTMLAnchorElement>(DELETE_TAGS_SELECTOR);

    return Array.from(anchorElements).map(
      (anchorElement) => anchorElement.href,
    );
  } catch (error) {
    console.error("getLinkedGroupDeletionTagsHref failed", error);
    return [];
  }
}

export async function deleteAllTagsInLinkedGroup(linkedGroupId: string) {
  const deletionTagHrefs = await getLinkedGroupDeletionTagsHref(linkedGroupId);
  try {
    for (const deletionTagHref of deletionTagHrefs) {
      await fetch(deletionTagHref, {
        method: "GET",
        credentials: "include",
        headers,
      });
    }

    return true;
  } catch (error) {
    console.error("deleteAllTagsInLinkedGroup failed", error);

    return false;
  }
}

export async function addTagsToLinkedGroup(
  linkedGroupId: string,
  tags: string[],
): Promise<boolean> {
  try {
    const response = await fetch("torrents.php?ajax=1", {
      method: "POST",
      credentials: "include",
      body: new URLSearchParams({
        action: "add_tag",
        groupid: linkedGroupId,
        genre_tags: "adventure",
        tags: tags.join(",+"),
      }),
      headers,
    });

    return response.ok;
  } catch (error) {
    console.error("addTagsToLinkedGroup failed", error);

    return false;
  }
}

export async function getGameFaqLinkByPlatform(
  url: string,
  platform: string,
): Promise<string | null> {
  try {
    const response = (await xmlhttpRequestPromisified<Document>({
      url,
    })) as GMType.XHRResponse<unknown>;

    if (!response.responseXML) {
      throw new Error(`Failed to load GameFaq (${url})`);
    }

    const anchorElements =
      response.responseXML.querySelectorAll<HTMLAnchorElement>(
        GAMEFAQ_PLATFORM_LINK_SELECTOR,
      );

    return (
      Array.from(anchorElements)
        .map((anchorElement) => {
          const spanElement = anchorElement.childNodes[0] as HTMLSpanElement;
          return {
            href: `${GAMEFAQ_URL}${anchorElement.pathname}`,
            title: spanElement.innerText,
          };
        })
        .find((link) => link.title === GAMEFAQ_PLATFORM_MAPPING[platform])
        ?.href ?? ""
    );
  } catch (error) {
    console.error("getGameFaqLinkByPlatform failed", error);
    return "";
  }
}
