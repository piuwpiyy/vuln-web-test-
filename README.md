# VulnLogin Lab

Website login yang sengaja dibuat rentan untuk latihan keamanan pada GitHub Pages.

## 5 kerentanan yang didemokan

1. **Client-side authentication bypass** — kredensial dan keputusan login berada di JavaScript.
2. **Client-side authorization / privilege escalation** — status `loggedIn` dan `role` dapat diubah melalui DevTools/localStorage.
3. **DOM XSS** — parameter `q` dari URL dimasukkan ke `innerHTML`.
4. **IDOR/BOLA-style access control flaw** — profile dipilih berdasarkan `id` tanpa pemeriksaan otorisasi server.
5. **Open redirect** — parameter `url` digunakan sebagai tujuan redirect tanpa allowlist.

> Catatan: karena GitHub Pages adalah hosting statis, lab ini mensimulasikan pola kerentanan sisi-klien. Ini bukan implementasi backend yang benar-benar menggunakan database.

## Cara menjalankan di GitHub Pages

1. Buat repository GitHub baru, misalnya `vuln-login-lab`.
2. Upload semua file dari folder ini ke branch utama.
3. Buka **Settings → Pages**.
4. Pilih **Deploy from a branch**, branch `main`, folder `/root`.
5. Simpan dan buka URL GitHub Pages yang diberikan.

## Akun demo

- `admin` / `Admin123!`
- `student` / `Student123!`

## Cara menguji secara aman

### 1. Authentication bypass
Buka DevTools → Console dan periksa `app.js`. Login tidak divalidasi server.

### 2. Manipulasi role
Setelah login, di Console:
```js
localStorage.setItem("loggedIn", "true");
localStorage.setItem("role", "admin");
location.href = "dashboard.html";
```

### 3. DOM XSS
Uji halaman search dengan payload demonstrasi yang tidak mengambil data:
```text
search.html?q=<img src=x onerror=alert(document.domain)>
```

### 4. IDOR-style
Bandingkan:
```text
profile.html?id=1
profile.html?id=2
```

### 5. Open redirect
Uji dengan domain contoh:
```text
redirect.html?url=https://example.com
```

Jangan gunakan payload atau target untuk menyerang situs pihak lain.
