
export interface FeaturedSlab {
  id: string;
  name: string;
  origin: string;
  status: string;
  image: string;
}

export const FEATURED_SLABS: FeaturedSlab[] = [
  {
    id: "slab_01",
    name: "Honey Onyx",
    origin: "Iran",
    status: "Backlit Ready",
    image: "https://as2.ftcdn.net/v2/jpg/08/66/07/71/1000_F_866077175_sz6VXfzG4z80n2p12FtOUvHqqwY9tD8z.jpg"
  },
  {
    id: "slab_02",
    name: "Emerald Quartzite",
    origin: "Brazil",
    status: "Dark",
    image: "https://futerno.com/wp-content/uploads/2023/09/nero-marinace-gCWmM5SMG28.jpeg"
  },
  {
    id: "slab_03",
    name: "Patagonia Granite",
    origin: "Argentina",
    status: "Exotic",
    image: "https://euromarble.com.au/wp-content/uploads/2021/10/Patagonia-Granite-1.jpg"
  }
];
