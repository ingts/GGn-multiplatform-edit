import { css } from "@emotion/react";
import { useState } from "react";
import {
  addTagsToLinkedGroup,
  addTorrentsToCollection,
  copyWeblinksToLinkedGroup,
  deleteAllTagsInLinkedGroup,
} from "./apis";
import { Checkbox } from "./components/Checkbox";
import { CheckboxSelectionGroup } from "./components/CheckboxSelectionGroup";
import {
  EXCLUDED_CONSOLE_COLLECTION_IDS,
  EXCLUDED_PC_COLLECTION_IDS,
  PC_LINKED_GROUPS_TITLES,
} from "./constants";
import { useCheckboxes } from "./hooks/useCheckboxes";
import {
  getCollectionLinks,
  getLinkedGroups,
  getTags,
  getWebLinks,
} from "./utils/";

export const App = () => {
  const destinationLinkedGroups = getLinkedGroups();
  const weblinks = getWebLinks();
  const tags = getTags();
  const collections = getCollectionLinks();

  const [loading, setLoading] = useState(false);
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const [copyWeblinks, setCopyWeblinks] = useState(true);
  const [copyTags, setCopyTags] = useState(false);
  const { checkboxes, handleCheckboxChange } = useCheckboxes(
    destinationLinkedGroups.length,
    false,
    false,
  );

  async function handleRun() {
    const areAllCheckboxesUnchecked = checkboxes.every(
      (checkbox) => checkbox === false,
    );

    try {
      setLoading(true);

      const filteredDestinationLinkedGroups = destinationLinkedGroups.filter(
        (_, index) => (areAllCheckboxesUnchecked ? true : checkboxes[index]),
      );

      for (const { id } of collections) {
        // TODO: Hide all this logic
        await addTorrentsToCollection(
          id,
          filteredDestinationLinkedGroups
            .filter(({ title }) => {
              if (PC_LINKED_GROUPS_TITLES.includes(title)) {
                if (EXCLUDED_PC_COLLECTION_IDS.includes(id))
                  return false;
              } else if (EXCLUDED_CONSOLE_COLLECTION_IDS.includes(id)) {
                // Assume everything that's not a PC is a console. ¯\_(ツ)_/¯
                return false;
              }
              return true;
            })
            .map(({ href }) => href),
        );
      }

      for (const destinationLinkedGroup of filteredDestinationLinkedGroups) {
        if (copyWeblinks) {
          await copyWeblinksToLinkedGroup(weblinks, destinationLinkedGroup);
        }

        if (copyTags) {
          await deleteAllTagsInLinkedGroup(destinationLinkedGroup.id);
          await addTagsToLinkedGroup(
            destinationLinkedGroup.id,
            tags.map((tag) => tag.id),
          );
        }
      }
    } catch (error) {
      console.error("something went wrong", error);
    } finally {
      setLoading(false);
    }
  }

  if (destinationLinkedGroups.length === 0) {
    return null;
  }

  return (
    <div className="box">
      <div className="head">
        <strong>Multiplatform Edit</strong>
      </div>

      <div css={css({ display: "flex" })}>
        <input
          onClick={handleRun}
          css={css({ flex: "1" })}
          type="button"
          value={loading ? "🏃" : "Run"}
          disabled={loading}
        />
        <input
          onClick={() => setAreOptionsVisible(!areOptionsVisible)}
          css={css({ flex: "1" })}
          type="button"
          value={areOptionsVisible ? "Hide options" : "Show options"}
        />
      </div>

      {areOptionsVisible ? (
        <div
          className="body"
          css={css({
            display: "flex",
            flexDirection: "column",
            gap: "13px",
            marginTop: "13px",
          })}
        >
          <CheckboxSelectionGroup
            id="linked-groups"
            title="Destination Linked Groups"
            hasAllCheckbox={false}
            data={destinationLinkedGroups}
            checkboxes={checkboxes}
            handleCheckboxChange={handleCheckboxChange}
          />

          <Checkbox
            id="weblinks"
            title="Copy weblinks"
            checked={copyWeblinks}
            onChange={() => setCopyWeblinks(!copyWeblinks)}
          />

          <Checkbox
            id="tags"
            title="Copy tags"
            checked={copyTags}
            onChange={() => setCopyTags(!copyTags)}
          />

          {/** TODO: Finer control over tags
          <CheckboxSelectionGroup
            id="tags"
            title="Tags"
            initialCheckboxesValue={false}
            hasAllCheckbox={false}
            data={tags}
          />
					*/}
        </div>
      ) : null}
    </div>
  );
};
