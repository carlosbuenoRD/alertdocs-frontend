// COMPONENTS
import { Accordion, AccordionTab } from "primereact/accordion";
import Column from "./Column";

function KanbaContainer(props: any) {
  return (
    <>
      {props.multiple ? (
        <Accordion>
          <AccordionTab>
            <div className="grid flex-nowrap w-full place-items-center">
              <Column header="Pendientes" items={[]} />
              <Column header="En Proceso" items={[]} />
              <Column header="Revision" items={[]} />
              <Column header="Completados" items={[]} />
            </div>
          </AccordionTab>
        </Accordion>
      ) : (
        <div className="grid flex-nowrap w-full place-items-centerborder-200 border-round-md">
          <Column header="Pendientes" items={[]} />
          <Column header="En Proceso" items={[]} />
          <Column header="Revision" items={[]} />
          <Column header="Completados" items={[]} />
        </div>
      )}
    </>
  );
}

export default KanbaContainer;
