import { useEffect, useState } from "react";
import ProductAPI from "@/lib/app/Products";


export default function Test() {
    const [items, setItems] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await ProductAPI.getProduct(); // Funktionsaufruf!
                setItems(data);
                console.log(data);
            } catch (error) {
                console.error("Fehler beim Laden der Produkte:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <>

        </>
    )
}