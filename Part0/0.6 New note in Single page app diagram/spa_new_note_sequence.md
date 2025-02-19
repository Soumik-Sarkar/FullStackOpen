sequenceDiagram
participant browser
participant server

    Note right of browser: User writes a note and clicks "Save"

    Note right of browser: The JavaScript updates the UI instantly with the new note

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created (New note saved)
    deactivate server

    Note right of browser: The browser does not reload the page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Updated JSON with new note
    deactivate server

    Note right of browser: Browser ensures the note list is up to date
