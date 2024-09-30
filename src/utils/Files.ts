/**
 * function where you can download a file from a url
 * but using this function needs the file extension of the file in
 * parameter fileName;
 * @param url
 * @param fileName
 */

export async function downloadFile(url: string, fileName: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const createdObject = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = createdObject;
    link.download = `${fileName}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(createdObject);
  } catch (error) {
    console.log(error);
  }
}
