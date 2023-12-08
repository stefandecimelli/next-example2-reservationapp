import NavBar from "../../../components/NavBar";

export default function Header({ name }: { name: string }) {
    
    const renderTitle = (name: string) => {
        const nameArray = name.split("-");
        nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`
        return nameArray.join(" ");
    }

    return (
        <>
            <NavBar />
            <div className="overflow-hidden h-96">
                <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
                    <h1 className="text-center text-white capitalize text-7xl captitalize text-shadow">
                       {renderTitle(name)}
                    </h1>
                </div>
            </div>
        </>
    )
}