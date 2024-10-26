const VITE_NEWS_API_PATH = import.meta.env.VITE_NEWS_API_PATH;
const VITE_COMMENT_API_PATH = import.meta.env.VITE_COMMENT_API_PATH;
const VITE_USER_API_PATH = import.meta.env.VITE_USER_API_PATH;

export async function getNews(limit?: number) {
  let response;
  if (!limit) {
    response = await fetch(`${VITE_NEWS_API_PATH}`, { method: "GET" });
    return response.json();
  }
  response = await fetch(`${VITE_NEWS_API_PATH}?limit=${limit}`);
  return response.json();
}

export async function getNewsForUser(limit?: number) {
  let response;
  if (!limit) {
    response = await fetch(`${VITE_NEWS_API_PATH}/user`, { method: "GET" });
    return response.json();
  }
  response = await fetch(`${VITE_NEWS_API_PATH}/user?limit=${limit}`);
  return response.json();
}

export async function getNewsByCategory(category?: string, limit?: number) {
  let response;
  if (!limit) {
    response = await fetch(
      `${VITE_NEWS_API_PATH}/category?category=${category}`,
      { method: "GET" }
    );
    return response.json();
  }
  response = await fetch(
    `${VITE_NEWS_API_PATH}/category?limit=${limit}&category=${category}`
  );
  return response.json();
}

export async function getNewsById(id: string | undefined) {
  const response = await fetch(`${VITE_NEWS_API_PATH}/${id}`);
  return response.json();
}

export async function getNewsBySearchQuery(query: string | null) {
  const response = await fetch(`${VITE_NEWS_API_PATH}/search?query=${query}`, {
    method: "GET",
  });

  return response.json();
}

export async function getNewsCount(
  status: string = "none"
): Promise<{ newsCount: number }> {
  let response;
  if (status === "none") {
    response = await fetch(`${VITE_NEWS_API_PATH}/count`, { method: "GET" });
  } else {
    response = await fetch(`${VITE_NEWS_API_PATH}/count?status=${status}`);
  }

  return response.json();
}

export async function getCommentCount(): Promise<{ commentsCount: number }> {
  const response = await fetch(`${VITE_COMMENT_API_PATH}/count`, {
    method: "GET",
  });
  return response.json();
}

export async function getCommentCountByNewsId(
  newsId: string | undefined
): Promise<{ commentsCount: number }> {
  const response = await fetch(
    `${VITE_COMMENT_API_PATH}/count?newsId=${newsId}`,
    {
      method: "GET",
    }
  );
  return response.json();
}

export async function login(email?: string, password?: string) {
  const response = await fetch(`${VITE_USER_API_PATH}/login`, {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.status === 500) {
    throw new Error("error");
  }
  return response.ok;
}

export async function getLoggedInUser() {
  const response = await fetch(`${VITE_USER_API_PATH}`, { method: "GET" });
  if (response.status === 500) throw new Error("error");
  return response.json();
}

export async function logout() {
  const response = await fetch(`${VITE_USER_API_PATH}/logout`, {
    method: "GET",
  });
  return response.ok;
}

interface NewsBody {
  title: string | undefined;
  content: string | undefined;
  image: string | undefined;
  category: string | undefined;
  status: string | undefined;
}

export async function createNews(body: NewsBody) {
  const response = await fetch(`${VITE_NEWS_API_PATH}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return { isAddSuccess: response.ok, data: response.json() };
}

export async function updateNews(body: NewsBody, newsId: string | undefined) {
  const response = await fetch(`${VITE_NEWS_API_PATH}/${newsId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return { isUpdateSuccess: response.ok, data: response.json() };
}

export async function deleteNews(newsId: string) {
  const response = await fetch(`${VITE_NEWS_API_PATH}/${newsId}`, {
    method: "DELETE",
  });

  return response.ok;
}

interface CreateCommentBody {
  newsId?: string;
  comment?: string;
}
export async function createComment(body: CreateCommentBody) {
  const response = await fetch(`${VITE_COMMENT_API_PATH}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return { isSuccess: response.ok };
}

export async function getComment(newsId: string | undefined) {
  const response = await fetch(`${VITE_COMMENT_API_PATH}?newsId=${newsId}`, {
    method: "GET",
  });
  return response.json();
}
