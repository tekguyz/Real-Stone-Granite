/**
 * COMPANY_KB: The Authoritative Data Source for Real Stone & Granite Corp.
 * Pillars: Integrity, Craftsmanship, Quality.
 * Updated: Jan 2026 - Digital Twin Version
 */
export const COMPANY_KB = {
  identity: {
    name: "Real Stone & Granite Corp",
    established: 1993,
    motto: "Excellence in Stone",
    mission: "Crafting distinguished architectural surfaces since 1993. To deliver superior products at a fair price, showcasing relentless pride in our work and the timeless beauty of natural materials.",
    pillars: ["Integrity", "Craftsmanship", "Quality"],
    awards: ["Natural Stone Institute - David Spirit of Service Award", "Gary Sinise Foundation Partner"]
  },
  facility: {
    address: "427 South Market Avenue, Fort Pierce, FL 34982",
    specs: "20,000 sq. ft. State-of-the-Art Fabrication Facility & Design Center",
    hours: "Monday – Friday, 8:00 AM – 4:00 PM",
    access: "Showroom appointment recommended for personalized consultation"
  },
  territory: {
    primary: "Florida's Treasure Coast (Port St. Lucie, Vero Beach, Stuart, Jupiter, Fort Pierce)",
    extended: "Throughout Florida and North America",
    international: "Export Logistics to Bahamas and Caribbean Islands"
  },
  sourcing: {
    origin: "Our founder personally hand-selects unique materials from the historic quarries of Italy, Spain, Greece, and Brazil.",
    standards: "Direct extraction oversight ensures the structural integrity and aesthetic exclusivity our clients demand."
  },
  
  // --- STRICT INVENTORY MAPPING ---
  materials: {
    natural: [
      {
        type: "Granite",
        description: "The definition of endurance. A naturally durable, heat-resistant stone available in a vast spectrum of colors and deep geological patterns.",
        visualKeywords: "Macro granite texture, polished igneous rock slab, deep grain granite",
        attributes: ["Heat Resistant", "Durable", "Varied Patterns"]
      },
      {
        type: "Marble",
        description: "The historical standard for elegance. Renowned for its classic veining and soft, sophisticated aesthetic that defines luxury interiors.",
        visualKeywords: "Carrara marble veining macro, polished white marble slab, calacatta gold texture",
        attributes: ["Classic Veining", "Elegant", "Cool Surface"]
      },
      {
        type: "Quartzite",
        description: "Nature's hybrid. A hard natural stone that delivers the refined visual depth of marble with the superior structural durability of granite.",
        visualKeywords: "Quartzite slab texture, taj mahal quartzite macro, crystalline stone surface",
        attributes: ["Marble Look", "Granite Durability", "High Hardness"]
      },
      {
        type: "Onyx",
        description: "A showpiece material. Its translucent properties make it ideal for high-end decorative features like back-lit panels, vanities, and bar tops.",
        visualKeywords: "Translucent onyx slab backlit, orange onyx texture, honey onyx stone",
        attributes: ["Translucent", "Back-Lit Capable", "Decorative"]
      },
      {
        type: "Exotic Stones",
        description: "Rare, museum-grade materials personally hand-picked by our leadership for their distinctive features and singular beauty.",
        visualKeywords: "Rare bookmatch marble, unique granite slab pattern, exotic stone macro",
        attributes: ["Hand-Picked", "Distinctive", "Rare"]
      }
    ],
    engineered: [
      {
        type: "Quartz",
        description: "Engineered perfection. A non-porous, manufactured surface offering maintenance-free durability and absolute consistency in pattern.",
        visualKeywords: "Quartz countertop texture white, engineered stone macro, speckle pattern",
        attributes: ["Non-Porous", "Consistent", "Low Maintenance"]
      },
      {
        type: "Dekton",
        description: "High-tech ultra-compact surface (Sintered Stone). Impervious to UV light, scratches, and extreme heat. The ultimate indoor-outdoor material.",
        visualKeywords: "Dekton industrial slab, matte concrete finish stone, sintered stone texture",
        attributes: ["UV Resistant", "Scratch Proof", "Heat Proof"]
      },
      {
        type: "Porcelain",
        description: "Large-format sintered slabs designed for modern, seamless applications. Ideal for monolithic kitchen islands and full-height wall cladding.",
        visualKeywords: "Large format porcelain slab, calacatta porcelain texture, thin slab",
        attributes: ["Large Format", "Seamless Look", "Modern"]
      }
    ]
  },

  capabilities: [
    {
      title: "Custom Fabrication",
      description: "Precision cutting via CNC bridge saws and 5-Axis Waterjet systems, guided by a master's touch.",
      focus: "Precision"
    },
    {
      title: "Advanced Design",
      description: "3D project rendering, digital templating, and virtual visualization for complete project confidence.",
      focus: "Technology"
    },
    {
      title: "Artistic Features",
      description: "Waterjet inlay patterns, 3D stone carving, sandblasting, and custom engraving.",
      focus: "Artistry"
    },
    {
      title: "Private Installation",
      description: "White-glove service including dust containment and final sealing by our senior masons.",
      focus: "Service"
    },
    {
      title: "Commercial Cladding",
      description: "Large-scale facade work and monument assembly for public and commercial structures.",
      focus: "Scale"
    }
  ],
  legacy: {
    notableProjects: [
      { name: "National Navy SEAL Museum Memorial", location: "Fort Pierce, FL" },
      { name: "Vietnam Wall Replica", location: "Traveling Exhibition" },
      { name: "9/11 First Responders Memorial", location: "Various Locations" },
      { name: "Space Walk of Fame", location: "Titusville, FL" },
      { name: "Gold Star Family Memorials", location: "Statewide" }
    ],
    expertise: "Master-level craftsmanship applied to monuments of national significance.",
    reviews: { count: 57, rating: 4.7, source: "Google Business Profile" }
  },
  contact: {
    phone: "(772) 489-9964",
    email: "info@realstoneandgranite.com",
    address: "427 South Market Avenue, Fort Pierce, FL 34982",
    // REMOVED: status: "Fabrication Line Active"
  },
};