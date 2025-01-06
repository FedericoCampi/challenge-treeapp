describe("Tree Component E2E Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/"); // Asegúrate de que la ruta sea la correcta para tu aplicación
    });
  
    it("Debe renderizar el árbol con el nodo raíz", () => {
      cy.contains("Tree Page").should("be.visible");
      cy.contains("Root").should("be.visible");
    });
  
    it("Debe permitir agregar un nuevo nodo", () => {
        cy.get("ul li").then(($initialNodes) => {
          const initialCount = $initialNodes.length;
      
          // Habilitar modo edición
          cy.get('input[type="checkbox"]').click();
      
          // Agregar un nuevo nodo
          cy.get('button[aria-label="Add"]').click();
          cy.get('input[type="text"]').type("Cypress Node");
          cy.get('button').contains("Add").click();
      
          // Verificar que se haya agregado un nodo más
          cy.get("ul li", { timeout: 8000 }).should(($newNodes) => {
            expect($newNodes.length).to.be.greaterThan(initialCount);
          });
        });
      });
  
      it("Debe permitir eliminar un nodo", () => {
        cy.get("button").contains(/Expandir Todos|Colapsar Todos/).click();
      
        // Habilitar modo edición
        cy.get("input[type='checkbox']").click();
      
        // Contar los nodos antes de agregar
        cy.get("ul li").then(($initialNodes) => {
          const initialCount = $initialNodes.length;
      
          // Agregar un nodo
          cy.get('button[aria-label="Add"]').click();
          cy.get("input[type='text']").type("Nodo a Eliminar");
          cy.get("button").contains("Add").click();
      
          // Verificar que la cantidad de nodos aumentó
          cy.get("ul li").should("have.length.greaterThan", initialCount);
      
          // Seleccionar el último nodo agregado y eliminarlo
          cy.get("ul li").last().within(() => {
            cy.get('button[aria-label="Delete"]').click();
          });
      
          // Confirmar que la cantidad de nodos vuelve a ser la inicial
          cy.get("ul li").should("have.length", initialCount);
        });
      });
  });