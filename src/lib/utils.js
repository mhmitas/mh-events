import { clsx } from "clsx";
import moment from "moment";
import queryString from "query-string";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formUrlQuery({ params, key, value }) {
  const currentUrl = queryString.parse(params)

  currentUrl[key] = value

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }) {
  const currentUrl = queryString.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export async function setPageNumberTo1(url) {
  console.log(url)
  const newUrl = url.replace(/page=\d+/i, "page=1")
  return newUrl
}


export function formatDate(date, format = "MMMM Do, YYYY") {
  return moment(new Date(date)).format(format);
}