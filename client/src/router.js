import Navigo from "navigo";

const router = new Navigo("/", true, "#");

async function initializeRoute(aModule) {
  (await aModule).default();
}

router.on({
  about: () => initializeRoute(import("./scenes/about")),
  more: () => initializeRoute(import("./scenes/more")),
  "*": () => initializeRoute(import("./scenes/home"))
});

export default router;

export function Navigate(location) {
  return () => router.navigate(location);
}
