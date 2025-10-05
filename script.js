document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("table-container");
  const searchBox = document.getElementById("searchBox");

  Papa.parse("Intesa.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: function(results) {
      const data = results.data;

      if (!data || data.length === 0) {
        container.innerHTML = "<p>No data found.</p>";
        return;
      }

      const table = document.createElement("table");
      table.classList.add("sortable"); // Tablesort requires class

      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      // Header
      const headers = Object.keys(data[0]);
      const headerRow = document.createElement("tr");
      headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // Data rows
      data.forEach(row => {
        const tr = document.createElement("tr");
        headers.forEach(header => {
          const td = document.createElement("td");
          td.textContent = row[header];
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });

      table.appendChild(thead);
      table.appendChild(tbody);
      container.innerHTML = "";
      container.appendChild(table);

      // Initialize sorting
      new Tablesort(table);

      // Filter functionality
      searchBox.addEventListener("input", () => {
        const filter = searchBox.value.toLowerCase();
        Array.from(tbody.rows).forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(filter) ? "" : "none";
        });
      });
    },
    error: function(err) {
      console.error("CSV parse error:", err);
      container.innerHTML = `<p style="color:red;">Error loading CSV: ${err.message}</p>`;
    }
  });
});
