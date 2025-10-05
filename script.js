document.addEventListener("DOMContentLoaded", () => {
  // Use the exact filename as it appears in the repo (case-sensitive on many hosts)
  Papa.parse("Intesa.csv", {
    download: true,
    header: true,
    complete: function(results) {
      // Filter out fully-empty rows (PapaParse can return an empty trailing row)
      let data = results.data || [];
      data = data.filter(row => Object.values(row).some(v => v !== null && String(v).trim() !== ""));
      const container = document.getElementById("table-container");

      // Show parse errors if any
      if (results.errors && results.errors.length) {
        console.error('CSV parse errors:', results.errors);
        container.innerHTML = `<p>Error parsing CSV: ${results.errors[0].message}</p>`;
        return;
      }
      if (data.length === 0) {
        container.innerHTML = "<p>No data found.</p>";
        return;
      }

      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      // Header row
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
    }
  });
});
