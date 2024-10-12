type Props = {
    url: string;
    name: string;
    onClick: (name: string) => void;
}

export const PhotoItem = ({ url, name, onClick }: Props) => {
    return (
            <div className="bg-[#3D3F43] rounded-xl p-3">
                <img src={url} alt={name} className="max-w-full block mb-3 rounded-xl" />
                <p>{name}</p>
                <button onClick={() => onClick(name)} className="bg-[#27282F] py-1 px-2 rounded-lg mt-2">Deletar</button>
            </div>
    );
}