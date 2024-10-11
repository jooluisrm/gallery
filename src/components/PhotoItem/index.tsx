type Props = {
    url: string;
    name: string;
}

export const PhotoItem = ({ url, name }: Props) => {
    return (
        <div className="bg-[#3D3F43] rounded-xl p-3">
            <img src={url} alt={name} className="max-w-full block mb-3 rounded-xl"/>
            <p>{name}</p>
        </div>
    );
}