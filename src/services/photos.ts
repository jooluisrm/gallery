import { Photo } from "@/types/photo";
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export const getAll = async () => {
    let list: Photo[] = [];

    const imagesFolder = ref(storage, "images"); // procurando uma referencia no firebase
    const photoList = await listAll(imagesFolder); // listando a referencia

    for(let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]); // gerando url para cada item

        list.push({
            name: photoList.items[i].name,
            url: photoUrl
        });
    };

    return list;
}