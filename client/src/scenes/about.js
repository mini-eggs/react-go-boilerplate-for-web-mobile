export default function() {
  import("../components/appContainer");
  import("../components/header");
  import("../components/details");

  document.body.innerHTML = `
    <app-container>
      <app-header></app-header>
      <app-details></app-details>
    </app-container>
  `;
}
