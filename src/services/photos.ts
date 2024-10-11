import { Photo } from "@/types/photo";
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as createId } from 'uuid';

export const getAll = async () => {
    let list: Photo[] = [];

    const imagesFolder = ref(storage, "images"); // procurando uma referencia no firebase
    const photoList = await listAll(imagesFolder); // listando a referencia

    for (let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]); // gerando url para cada item

        list.push({
            name: photoList.items[i].name,
            url: photoUrl
        });
    };

    return list;
}

export const insert = async (file: File) => { // função para inserir novas imagens 
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `images/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;

    } else {
        return new Error('Tipo do arquivo não permitido.');
    }
}