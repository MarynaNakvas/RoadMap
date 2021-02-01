const checkIsSuccess = ({ ok, status }: Response) =>
  ok && status >= 200 && status < 300;

export const createApiCall = async (url: string, options: any) => {
  const response = await fetch(`${url}`, options);
  const isSuccess = checkIsSuccess(response);

  if (!isSuccess) {
    let message = 'Something went wrong';

    try {
      const json = await response.json();
      if (json.message) {
        message = json.message;
      }
    } catch (error) {}

    throw new Error(`${url}: ${message}`);
  }

  try {
    const json = await response.json();
    return json;
  } catch (error) {
    return;
  }
};
