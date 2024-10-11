"use client"

import { useEffect, useState } from 'react';
import * as Photos from '../services/photos'
import { Photo } from '@/types/photo';
import { PhotoItem } from '@/components/PhotoItem';

const App = () => {

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

    return (
        <div className="bg-[#27282F] text-white min-h-screen">
            <div className="container m-auto max-w-[980px] py-8 px-0">
                <header>
                    <h1 className="m-0 p-0 text-center mb-8 text-3xl font-bold">Galeria de Fotos</h1>
                </header>

                {/* Area de upload */}

                {loading &&

                    <div className='text-center'>
                        <div className='text-5xl mb-5'>✋</div>
                        <div>Carregando...</div>
                    </div>
                }
                {!loading && photos.length > 0 &&
                    <div className='grid grid-cols-4 gap-3'>
                        {photos.map((item, index) => (
                            <PhotoItem key={index} url={item.url} name={item.name}/>
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