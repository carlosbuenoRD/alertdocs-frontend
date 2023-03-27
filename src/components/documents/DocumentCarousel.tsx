import React from "react";

// Components
import { Carousel } from "primereact/carousel";
import DocumentCard from "./DocumentCard";
import Card from "@/components/shared/Card";
import { notifyMe } from "@/services/Notify";

const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "600px",
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: "480px",
    numVisible: 1,
    numScroll: 1,
  },
];

function DocumentCarousel() {
  const productTemplate = (product: any) => {
    return (
      <div className="mr-4">
        <DocumentCard border notProgress />
      </div>
    );
  };

  return (
    <Card title="Finalizados recientemente" height="fit">
      <Carousel
        value={[1, 2, 2, 1, 1, 1]}
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={6000}
        itemTemplate={productTemplate}
      />
    </Card>
  );
}

export default DocumentCarousel;
