async function getAndPrintExtensionInfo(publisher) {
  const url = `https://open-vsx.org/api/-/search?query=${encodeURIComponent(publisher)}`;

  try {
    if (publisher === "") {
      console.log("No publisher specified");
      return;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonResponse = await response.json();
    printExtensionInfo(jsonResponse);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function printExtensionInfo(jsonResponse) {
  if (!jsonResponse.extensions || !Array.isArray(jsonResponse.extensions)) {
    console.log("No extensions found in the response");
    return;
  }

  jsonResponse.extensions.forEach(extension => {
    const name = extension.name || "Unknown";
    const displayName = extension.displayName || "Unknown";
    const version = extension.version || "Unknown";
    const downloadCount = extension.downloadCount || 0;

    console.log(`Extension: ${name} (${displayName}) version ${version}`);
    console.log(`Downloads: ${downloadCount}`);
    console.log("-------------------");
  });
}

async function getDownloadCount(publisher, extension) {
  const url = `https://open-vsx.org/api/${publisher}/${extension}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const downloadCount = data.downloadCount || 0;

    console.log(`Number of downloads for ${extension}: ${downloadCount}`);
    return downloadCount;
  } catch (error) {
    console.error('Error fetching download count:', error);
  }
}

// Publisher/manufacturer - change as required or make into a command line argument
const publisher = 'motivesoft';

// If there are command line args, treat each as an extension name and query its download count
// Otherwise get all the details for the publisher and iterate over everything returned
if (process.argv.length > 2) {
  // Iterate over command line arguments
  for (let i = 2; i < process.argv.length; i++) {
    getDownloadCount(publisher, process.argv[i]);
  }
} else {
  getAndPrintExtensionInfo(publisher);
}
