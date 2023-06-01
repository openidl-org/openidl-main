const fs = require('fs');
const path = require('path');

// Function to combine files in a folder
function combineFiles(folderPath, outputFileName) {
  // Read the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    // Filter out hidden files and files that don't match the expected naming convention
    const filteredFiles = files.filter(file => !(/^\./.test(file)) && /^DP_Test_Data_\d+\.txt$/.test(file));

    // Sort filtered files based on the numeric value in the file names
    filteredFiles.sort((a, b) => {
      const fileNumberA = parseInt(a.split('_')[3].split('.')[0]);
      const fileNumberB = parseInt(b.split('_')[3].split('.')[0]);
      return fileNumberA - fileNumberB;
    });

    // Create an array to hold the file contents
    const fileContents = [];

    // Loop through each file
    filteredFiles.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      fileContents.push(fileContent);
      console.log(`Appended data from ${file} to ${outputFileName}`);
    });

    // Join the file contents together without adding a separator
    const combinedContent = fileContents.join('');

    // Write the combined content to the output file
    fs.writeFileSync(outputFileName, combinedContent);

    console.log(`Combined files saved as ${outputFileName}`);
  });
}

// Usage: combineFiles('folder_path', 'output_file.txt');

// Example usage:
combineFiles('../../../../../con-data/Dwelling_Properties/dp', '../../../../../con-data/Dwelling_Properties/dp_filter_and_combine.txt');
