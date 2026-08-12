# Onue Line Cruises project instructions

## Artifact preservation

- Treat this directory as the persistent, authoritative editable source for Onue Line Cruises.
- Never delete, replace, rename, move, clean up, or recreate over this source directory unless the user explicitly requests that exact action.
- Treat every `Onue-Line-Cruises-v*.tgz` release archive in the parent project directory as a retained project artifact.
- Create new releases alongside existing releases. Never remove earlier versions unless explicitly requested.
- Excluding dependencies or generated build folders from a release archive does not authorize deleting them from this editable source directory.
- Before modifying the site, verify that the source directory and retained archives exist. After modifying it, verify that they still exist.
- If files disappear following a workspace or project-mirror refresh, report it as an environment persistence issue. Do not claim intentional deletion and do not overwrite another copy without confirming the authoritative baseline.
- The user prefers `.tgz` for compressed website releases.
