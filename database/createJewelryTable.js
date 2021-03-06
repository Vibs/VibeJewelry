import { createConnection } from "./connectSqlite.js";

(async () => {
    const connection = await createConnection();

    await connection.exec("DROP TABLE IF EXISTS jewelry");

    const jewelryTable = 
    `CREATE TABLE jewelry (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL,
        image_path TEXT)`;


    await connection.exec(jewelryTable);

    connection.run("INSERT into jewelry ('name', 'price', 'image_path', 'stock') VALUES (?, ?, ?, ?)", 
    "Vibes pæneste øreringe", 249.0, "ørering1.jpg", 0);

    connection.run("INSERT into jewelry ('name', 'price', 'image_path', 'stock') VALUES (?, ?, ?, ?)", 
    "Creole med farver", 149.0, "ørering2.jpg", 1);

    connection.run("INSERT into jewelry ('name', 'price', 'image_path', 'stock') VALUES (?, ?, ?, ?)", 
    "Muslingesæt 4 pcs.", 250.0, "ørering3.jpg", 2);

    connection.run("INSERT into jewelry ('name', 'price', 'image_path', 'stock') VALUES (?, ?, ?, ?)", 
    "Creole med struktur", 299.0, "ørering4.jpg", 0);
})() 