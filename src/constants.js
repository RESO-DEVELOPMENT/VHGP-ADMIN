import moment from "moment";

export const NOT_FOUND_IMG = "/images/notfound.webp";
export const getBase64Image = (url, type) => {
  //image/png
  //image/jpeg

  let image = "";
  if (type === "image/png") {
    image = url?.split("data:image/png;base64,");
  } else if (type === "image/jpeg") {
    image = url?.split("data:image/jpeg;base64,");
  }
  console.log(image);
  if (image && image[1]) {
    image = image[1];
  } else {
    image = "";
  }
  return image;
};
export const getBase64ImageNotType = async (src, callback, outputFormat) => {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
};
export const getBase64Ima = (imgUrl) => {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.src = imgUrl;
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };
    img.onerror = function () {
      reject("The image could not be loaded.");
    };
  });
};
export const statusTypeOptions = [
  {
    id: -1,
    value: "Tất cả",
    class: "status-create",
  },
  {
    id: 0,
    value: "Mới",
    class: "status-create",
  },
  {
    id: 1,
    value: "Cửa hàng xác nhận",
    class: "status-create",
  },
  {
    id: 2,
    value: "Chưa có tài xế",
    class: "status-shiper",
  },
  {
    id: 3,
    value: "Tài xế đã nhận",
    class: "status-processing",
  },
  {
    id: 4,
    value: "Đang Giao",
    class: "status-processing",
  },
  {
    id: 5,
    value: "Hoàn Thành",
    class: "status-success",
  },
  {
    id: 6,
    value: "Đã Hủy",
    class: "status-cancel",
  },
  {
    id: 7,
    value: "Đang lấy hàng",
    class: "status-processing",
  },
  {
    id: 8,
    value: "Ở Hub",
    class: "status-processing",
  },
  {
    id: 9,
    value: "Đang giao",
    class: "status-cancel",
  },
  {
    id: 10,
    value: "Hủy do hết thời gian đợi",
    class: "status-cancel",
  },
  {
    id: 11,
    value: "Tài xế hủy",
    class: "status-cancel",
  },
  {
    id: 12,
    value: "Cửa hàng hủy",
    class: "status-cancel",
  },
  {
    id: 13,
    value: "Khách hàng hủy",
    class: "status-cancel",
  },
];
export const statusType = [
  {
    id: 0,
    value: "Mới",
    class: "status-create",
  },
  {
    id: 1,
    value: "Cửa hàng xác nhận",
    class: "status-create",
  },
  {
    id: 2,
    value: "Chưa có tài xế",
    class: "status-shiper",
  },
  {
    id: 3,
    value: "Tài xế đã nhận",
    class: "status-processing",
  },
  {
    id: 4,
    value: "Đang Giao",
    class: "status-processing",
  },
  {
    id: 5,
    value: "Hoàn Thành",
    class: "status-success",
  },
  {
    id: 6,
    value: "Đã Hủy",
    class: "status-cancel",
  },
  {
    id: 7,
    value: "Đang lấy hàng",
    class: "status-processing",
  },
  {
    id: 8,
    value: "Ở Hub",
    class: "status-processing",
  },
  {
    id: 9,
    value: "Đang giao",
    class: "status-processing",
  },
  {
    id: 10,
    value: "Hủy do hết thời gian đợi",
    class: "status-cancel",
  },
  {
    id: 11,
    value: "Tài xế hủy",
    class: "status-cancel",
  },
  {
    id: 12,
    value: "Cửa hàng hủy",
    class: "status-cancel",
  },
  {
    id: 13,
    value: "Khách hàng hủy",
    class: "status-cancel",
  },
];
export const getModeName = (mode) => {
  switch (mode) {
    case "1":
      return "Gọi món";
    case "2":
      return "Giao Hàng";
    case "3":
      return "Đặt Hàng";

    default:
      return "Gọi món";
  }
};
export const getTimeConvert = (time) => {
  moment.locale("vi");
  let date = moment(time).format("l");
  let hour = moment(time).format("LT");
  return `${date}, ${hour}`;
};
export const getPaymentStatusName = (payment) => {
  switch (payment) {
    case 0:
      return "THTM";
    case 1:
      return "THCK";
    case 2:
      return "Đã Thanh Toán";

    default:
      return "---";
  }
};
