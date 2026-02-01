
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
    image: "https://images.unsplash.com/photo-1615800098779-1be32e60cca3?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: "slab_02",
    name: "Cristallo Quartzite",
    origin: "Brazil",
    status: "Translucent",
    image: "https://images.unsplash.com/photo-1595414695305-65ba9eb2487e?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: "slab_03",
    name: "Patagonia Granite",
    origin: "Argentina",
    status: "Exotic",
    image: "https://images.unsplash.com/photo-1574064379743-c07a38928e5f?q=80&w=1500&auto=format&fit=crop"
  }
];
