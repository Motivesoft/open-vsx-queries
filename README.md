# open-vsx-queries
Issue queries against the Open VSX Registry API to list download counts and other details

## Usage
Two modes of usage.

```shell
# Run with no command line arguments to list all extensions for the publisher
node index.js

# Run with one or more extension names to get results just for those
node index.js [extension-name ...]
```

## Notes
- Publisher name is currently hardcoded in [index.js](index.js)
- Relies on the Open VSX Registry API, which may change over time
- Usage restrictions may exist for the API
- Note that the Visual Studio Marketplace currently does not offer a public API