export function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export function getCommon(arr1, arr2) {
  arr1.sort();
  arr2.sort();
  var common = [];
  var i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] == arr2[j]) {
      common.push(arr1[i]);
      i++;
      j++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return common;
}
