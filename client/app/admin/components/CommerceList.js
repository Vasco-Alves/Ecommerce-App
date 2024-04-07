import Commerce from '@/app/admin/components/Commerce';

const CommerceList = ({ commerceList, deleteCommerce }) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {commerceList.map((commerce) => (
                <Commerce
                    name={commerce.name}
                    cif={commerce.cif}
                    street={commerce.street}
                    email={commerce.email}
                    phone={commerce.phone}
                    imageSrc={commerce.image}
                />
            ))}
        </div>
    );
}

export default CommerceList;