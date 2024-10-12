import { Photo } from "@/types/photo";
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { v4 as createId } from 'uuid';
import { error } from "console";

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

export const deletePost = async (name: string) => {
    const desertRef = ref(storage, `images/${name}`);
    try {
        await deleteObject(desertRef);
        alert("Imagem deletada com sucesso!");
        return true; // Retorna true se a deleção foi bem-sucedida
    } catch (error) {
        console.error("Erro ao tentar deletar o arquivo!", error);
        return false; // Retorna false em caso de erro
    }
}