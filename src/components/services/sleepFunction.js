const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export async function sleepTime(milliseconds) {
  await sleep(milliseconds);
}
