function doGet() {
  return HtmlService.createTemplateFromFile('index')
  .evaluate()
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')

}

function saveData(data) {




   let folder = DriveApp.getFolderById("1UpJUPsMd81Oxkf-ZoaxMtAwJFw1N5LEX");
  let fileUrl
  let blob = data.myFile
  if (blob.name != ''){
  let file = folder.createFile(blob)
    fileUrl = file.getUrl()    
  }

  let myWorksheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
      myWorksheet.appendRow([new Date(),data.title,data.fname,data.lname,data.mdy,fileUrl,data.wishMessage])

 

      var numRows = myWorksheet.getDataRange().getLastRow();
      var count = (numRows-1);

      var msg = {
      "message": '\n'+'มีผู้แจ้งข้อมูลการติดเชื้อไวรัสโควิดเพิ่มเติม'+'\n'+'ชื่อ: '+data.title+ ' '+data.fname+ ' ' +data.lname +'\n'    +'ขอลาหยุดถึงวันที่: '+data.mdy+'\n'+'ข้อมูลเพิ่มเติม: '+data.wishMessage+'\n'+'ไฟล์หลักฐาน: '+fileUrl

      };
      sendLineNotify(msg);

      return data

}




function sendLineNotify(message) {
  var token = ["t6pQ1mNDlNlVCXKWsroOzf64600i6X0sHRJUcOJEuwm"]; //insert Notify Token
  var options = {
    "method": "post",
    "payload": message,
    "headers": {
    "Authorization": "Bearer " + token }
  }
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}