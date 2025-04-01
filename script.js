const apiUrl = "http://localhost:5125/api/products"; // Đổi port nếu cần

// Lấy danh sách sản phẩm
function getProducts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let productList = document.getElementById("productList");
            productList.innerHTML = ""; 
            data.forEach(product => {
                productList.innerHTML += `
                    <li>
                        ${product.id} - ${product.name} - ${product.price}₫
                        <div>
                            <button class="edit-btn" onclick="editProduct(${product.id}, '${product.name}', ${product.price})">Sửa</button>
                            <button class="delete-btn" onclick="deleteProduct(${product.id})">Xóa</button>
                        </div>
                    </li>
                `;
            });
        })
        .catch(error => console.error("Lỗi:", error));
}

// Thêm sản phẩm
function addProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;

    if (!name || !price) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price })
    })
    .then(() => { 
        getProducts(); 
        clearForm(); 
    })
    .catch(error => console.error("Lỗi:", error));
}

// Xóa sản phẩm
function deleteProduct(id) {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => { getProducts(); })
        .catch(error => console.error("Lỗi:", error));
}

// Sửa sản phẩm (Hiển thị dữ liệu vào ô input)
function editProduct(id, name, price) {
    document.getElementById("productId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;

    // Hiển thị nút "Cập nhật", ẩn nút "Thêm"
    document.getElementById("addButton").style.display = "none";
    document.getElementById("updateButton").style.display = "inline-block";
}

// Cập nhật sản phẩm
function updateProduct() {
    let id = document.getElementById("productId").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;

    if (!name || !price) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, price })
    })
    .then(() => { 
        getProducts();
        clearForm();
    })
    .catch(error => console.error("Lỗi:", error));
}

// Xóa dữ liệu form
function clearForm() {
    document.getElementById("productId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";

    // Hiển thị lại nút "Thêm", ẩn nút "Cập nhật"
    document.getElementById("addButton").style.display = "inline-block";
    document.getElementById("updateButton").style.display = "none";
}

// Load danh sách sản phẩm khi mở trang
getProducts();
