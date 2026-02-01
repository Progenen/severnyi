import { flsModules } from "./modules.js";

const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

// Проверка статуса ответа
const checkStatus = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText || "Request failed");
  }
  return response;
};

// Парсинг ответа
const extractIn = (response, format = "json") => {
  const map = {
    json: () => response.json(),
    text: () => response.text(),
    formData: () => response.formData(),
    blob: () => response.blob(),
  };

  return map[format] ? map[format]() : response.text();
};

// Показ модалки статуса
const showStatus = () => {
  const activeModal = document.querySelector(".popup_show");
  if (activeModal) {
    activeModal.querySelector(".popup__close")?.click();
  }
  flsModules.popup?.open("#status-template");
};

// 🔥 ГЛАВНЫЙ REQUEST
const request = async (
  { url, method = Method.GET, body = null },
  format,
) => {
  try {
    const options = { method };

    // Тело запроса
    if (body) {
      if (body instanceof FormData) {
        options.body = body;
        // headers НЕ НУЖНЫ
      } else if (typeof body === "object") {
        options.body = JSON.stringify(body);
        options.headers = {
          "Content-Type": "application/json",
        };
      } else {
        options.body = body;
      }
    }

    const response = await fetch(url, options);

    if (response.redirected) {
      window.location.href = response.url;
      return;
    }

    const status = checkStatus(response);
    const data = await extractIn(status, format);

    return cb ? cb(data) : data;
  } catch (err) {
    console.error(err);
    // showStatus(err);
    throw err;
  }
};

export default {
  // GET
  load({ url, format = "json", cb }) {
    return request({ url, method: Method.GET }, format, cb);
  },

  // POST / PUT / DELETE
  upload({ url, body, method = Method.POST, format = "json", cb }) {
    return request({ url, method, body }, format, cb);
  },
};
