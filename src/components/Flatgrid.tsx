export default function FlatsGrid() {
    const flats = [
      { name: "Worli", image: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1742214536/pexels-tamjeedag-31069460_nbsr7g.jpg" },
      { name: "Lower Parel", image: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1742214537/pexels-optical-chemist-340351297-15723780_dptdpv.jpg" },
      { name: "Bandra", image: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1742214537/pexels-iamrizwan-1320663_s4n8zm.jpg" },
      { name: "Juhu", image: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1742214539/pexels-jarod-16558193_ez5fv1.jpg" },
      { name: "BKC", image: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1742214539/pexels-jarod-16572437_n68pwq.jpg" },
      { name: "Seawoods", image: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1742214540/pexels-iamrizwan-1311046_rbu7of.jpg" },
      { name: "Goregaon", image: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1742214552/pexels-drones-flown-540227711-16970120_csbd4c.jpg" },
      { name: "Kharghar", image: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1742214553/pexels-drones-flown-540227711-17286413_jciq1e.jpg" },
    ];
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {flats.map((flat, index) => (
            <div
              key={index}
              className="relative h-48 bg-cover bg-center rounded-lg overflow-hidden shadow-lg"
              style={{ backgroundImage: `url(${flat.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
                <h2 className="text-white text-lg font-semibold">Flats for sale in <br/> <span className="font-bold " style={{fontSize:'30px '}}>{flat.name}</span></h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  