(function(){
  var t; try { t = localStorage.getItem('petal-theme'); } catch(e) {}
  if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
})();

var PHONE = "923001234567";   // apna WhatsApp number: country code ke saath, bina + ya space ke

/* img = images/ folder ki file ka naam YA poora https link. color = photo na ho to yeh rang dikhega. */
var bouquets = [
  { name: "Red Rose Bouquet",   note: "Twelve long-stem red roses",      price: 3500, occ: "Gift",     img: "https://cdn.avasflowers.net/img/prod_img/avasflowers-red-rose-masterpiece-48-premium-long-stem-24121.png", color: "#9d2a2f" },
  { name: "Sunflower Bunch",    note: "Bright sunflowers with greens",   price: 2800, occ: "Birthday", img: "https://euroflorist.ergonode.cloud/api/multimedia/file/38c7e8cd-4d64-4e73-8a8d-7bfe680102e2.jpg",   color: "#d9a21b" },
  { name: "Lavender Mix",       note: "Lavender and purple wildflowers", price: 3200, occ: "Gift",     img: "https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1/vendor/7629/catalog/product/d/4/d4f07f0f06d8cd01891337c067761bed_5dc0ea0a484fd.jpg",     color: "#6b5b95" },
  { name: "White Lily Bouquet", note: "White lilies and baby's breath",  price: 5200, occ: "Wedding",  img: "https://www.goshenflower.ae/cdn/shop/files/white-lily-bouquet-dubai.webp?v=1751984757&width=1445", color: "#8fa79a" },
  { name: "Orange Tulips",      note: "Ten tulips in orange and yellow", price: 2600, occ: "Birthday", img: "https://cdn.florista.ph/uploads/product/floristaph/MAY2025/4982-1747132810720.webp",       color: "#d9642b" },
  { name: "Wildflower Garden",  note: "A colourful seasonal mix",        price: 3000, occ: "Wedding",  img: "https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1/vendor/9077/catalog/product/2/0/20231230083413_file_65907ec53fe05_65907fb11ecc7.jpeg", color: "#3d7a5b" }
];

/* poora link ho to waise hi use karo, warna images/ folder se */
function src(p) {
  return /^https?:\/\//.test(p) ? p : "images/" + p;
}

var grid = document.getElementById("grid");
bouquets.forEach(function (b) {
  var card = document.createElement("article");
  card.className = "card";
  card.dataset.occ = b.occ;
  card.innerHTML =
    '<div class="tile" style="--c:' + b.color + '"><span class="fallback">' + b.name + '</span>' +
    '<img loading="lazy" src="' + src(b.img) + '" alt="' + b.name + '" onerror="this.remove()"></div>' +
    '<div class="info"><h3>' + b.name + '</h3><p>' + b.note + '</p>' +
    '<div class="row"><span class="price">Rs ' + b.price.toLocaleString() + '</span>' +
    '<a class="buy" target="_blank" rel="noopener" href="https://wa.me/' + PHONE + '?text=' +
    encodeURIComponent("Hi Petal, I would like to order the " + b.name + ".") + '">Order</a></div></div>';
  grid.appendChild(card);
});

/* photo load ho jaye to text wala fallback chhupa do */
document.querySelectorAll(".tile img").forEach(function (im) {
  function ok() { var f = im.parentNode.querySelector(".fallback"); if (f) f.style.display = "none"; }
  if (im.complete && im.naturalWidth) ok(); else im.addEventListener("load", ok);
});

document.getElementById("chips").addEventListener("click", function (e) {
  var btn = e.target.closest(".chip"); if (!btn) return;
  document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("on"); });
  btn.classList.add("on");
  var f = btn.dataset.f;
  document.querySelectorAll(".card").forEach(function (c) {
    c.classList.toggle("hide", f !== "all" && c.dataset.occ !== f);
  });
});

document.querySelectorAll("a.wa").forEach(function (a) {
  a.href = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent("Hi Petal, I would like to order flowers.");
  a.target = "_blank"; a.rel = "noopener";
});

var root = document.documentElement, tbtn = document.getElementById("theme");
function paint() { tbtn.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙"; }
paint();
tbtn.addEventListener("click", function () {
  var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("petal-theme", next); } catch (e) {}
  paint();
});
document.getElementById("yr").textContent = new Date().getFullYear();



















































