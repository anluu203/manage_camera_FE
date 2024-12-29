import { Link, Ellipsis, FilePenLine, Trash } from "lucide-react";
import { Dropdown } from "flowbite-react";
type RoomCardProps = {
  id?: number;
  name: string;
  address: string;
  description?: string;
  onClickUpdate?: () => void;
  onClickDelete?: () => void;
};

export const RoomCard = ({
  id,
  name,
  address,
  description,
  onClickUpdate,
  onClickDelete,
}: RoomCardProps) => {
  return (
    <div data-aos-delay="300" className="rounded-xl bg-white p-6  shadow-xl">
      <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-sky-500 shadow-sky-500/40">
        <Link size={30} color="#ffff" />
      </div>
      <div className=" flex -translate-y-12 transform items-center justify-end">
        <Dropdown
          label=""
          dismissOnClick={false}
          renderTrigger={() => (
            <span>
              <Ellipsis />
            </span>
          )}
        >
          <Dropdown.Item
            icon={(props) => (
              <FilePenLine {...props} size={16} className="mr-2" />
            )}
            onClick={onClickUpdate}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            icon={(props) => <Trash {...props} size={16} className="mr-2" />}
            onClick={onClickDelete}
          >
            Delete
          </Dropdown.Item>
        </Dropdown>
      </div>

      <h1 className="text-darken text-center mb-3 pt-1 text-xl font-medium lg:h-14 lg:px-14">
        {name}
      </h1>
      <span className="hidden">{id}</span>
      <p className="px-2 text-gray-500">
        <span className="font-bold text-gray-800 me-1">Address:</span>
        <span>{address}</span>
      </p>
      <p className="px-2 text-gray-500">
        <span className="font-bold text-gray-800 me-1">Description:</span>
        <span>{description}</span>
      </p>
    </div>
  );
};
