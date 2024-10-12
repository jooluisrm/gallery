"use client"

import { useEffect, useState, FormEvent } from 'react';
import * as Photos from '../services/photos'
import { Photo } from '@/types/photo';
import { PhotoItem } from '@/components/PhotoItem';

const App = () => {

    const [uploading, setUpLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState<Photo[]>([]);


    useEffect(() => {
        const getPhotos = async () => {
            setLoading(true);
            setPhotos(await Photos.getAll());
            setLoading(false);
        }
        getPhotos();
    }, []);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;

        if (file && file.size > 0) {
            setUpLoading(true);
            let result = await Photos.insert(file);
            setUpLoading(false);

            if (result instanceof Error) {
                alert(`${result.name} - ${result.message}`);
            } else {
                let newPhotoList = [...photos]
                newPhotoList.push(result);
                setPhotos(newPhotoList);
            }
        }
    }

    const handleDeletePost = async (name: string) => {
        console.log('Apertou:', name);
        let yesDelete = confirm("Realmente deseja deletar essa imagem?"); // confirmação para deletar img
        if(!yesDelete) return;

        setLoading(true);
        let result = await Photos.deletePost(name);
        setLoading(false);
        if (result) {
            setPhotos((prevPhoto) => prevPhoto.filter(photo => photo.name != name));
        }
    }

    return (
        <div className="bg-[#27282F] text-white min-h-screen">
            <div className="container m-auto max-w-[980px] py-8 px-0">
                <header>
                    <h1 className="m-0 p-0 text-center mb-8 text-3xl font-bold">Galeria de Fotos</h1>
                </header>

                <form
                    method='POST'
                    onSubmit={handleFormSubmit}
                    className='bg-[#3D3F43] p-4 rounded-lg mb-8'
                >
                    <input type="file" name="image" id="" />
                    <input
                        type="submit"
                        value="Enviar"
                        className='bg-[#756DF4] border-0 text-white py-2 px-4 text-sm rounded-lg mx-5 cursor-pointer hover:opacity-80 transition-all'
                    />
                    {uploading && "Enviando..."}
                </form>

                {loading &&

                    <div className='text-center'>
                        <div className='text-5xl mb-5'>✋</div>
                        <div>Carregando...</div>
                    </div>
                }
                {!loading && photos.length > 0 &&
                    <div className='grid grid-cols-4 gap-3'>
                        {photos.map((item, index) => (
                            <PhotoItem key={index} url={item.url} name={item.name} onClick={handleDeletePost} />
                        ))}
                    </div>
                }
                {!loading && photos.length === 0 &&
                    <div className='text-center'>
                        <div className='text-5xl mb-5'>😞</div>
                        <div>Não há fotos cadastradas.</div>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;