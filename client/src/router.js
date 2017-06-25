import Navigo from "navigo";

const router = new Navigo("/", true, "#");
const initializeRoute = async aModule => (await aModule).default();

router.on({
  about: () => initializeRoute(import("./scenes/about")),
  more: () => initializeRoute(import("./scenes/more")),
  "*": () => initializeRoute(import("./scenes/home"))
});

export function Start() {
  router.resolve();
}

export function Navigate(location) {
  return () => router.navigate(location);
}
