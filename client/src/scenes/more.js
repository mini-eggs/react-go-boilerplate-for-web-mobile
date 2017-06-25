export default function() {
  import("../components/appContainer");
  import("../components/header");
  import("../components/choosePhoto");

  document.body.innerHTML = `
    <app-container>
      <app-header></app-header>
    </app-container>
  `;
}
