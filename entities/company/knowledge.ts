
/**
 * COMPANY_KB: The authoritative data source for Real Stone & Granite Corp.
 * Used for UI text, AI grounding context, and system specifications.
 */
export const COMPANY_KB = {
  identity: {
    name: "Real Stone & Granite Corp",
    established: 1993,
    motto: "Excellence in Stone",
    mission: "Providing high-performance architectural surfaces since 1993.",
  },
  sourcing: {
    origin: "Founder personally sources unique materials from Italy, Spain, Greece, and Brazil.",
    standards: "Direct extraction oversight ensures maximum structural integrity and aesthetic exclusivity.",
  },
  materials: {
    natural: [
      {
        type: "Granite",
        description: "Popular, durable choice known for distinct patterns and resilience in high-traffic areas.",
        attributes: ["Durable", "Unique Patterns", "Heat Resistant"],
      },
      {
        type: "Marble",
        description: "Prized for timeless elegance, unique veining, and smooth texture. Ideal for countertops and flooring.",
        attributes: ["Elegant", "Veined", "Classic"],
      },
      {
        type: "Quartzite",
        description: "Blends the strength of granite with the elegant appearance of marble.",
        attributes: ["High Strength", "Marble-like Aesthetic", "Hardened"],
      },
    ],
    engineered: [
      {
        type: "Quartz",
        description: "Over 90% real ground-up stone bound with resins. Nonporous and consistent.",
        brands: ["Caesarstone", "Cambria"],
        attributes: ["Nonporous", "Maintenance Free", "Consistent"],
      },
      {
        type: "Dekton",
        description: "Sophisticated blend of glass, porcelain, and quartz. Highly resistant to UV rays, scratches, and stains.",
        attributes: ["UV Resistant", "Scratch Resistant", "Ultra-Compact"],
      },
      {
        type: "Porcelain",
        description: "Sleek appearance and durability.",
        attributes: ["Lightweight", "Large Format", "Durable"],
      },
    ],
    exotic: [
      {
        type: "Onyx",
        description: "Spectacular, often multicolored with incredible coloring. Used for mosaics and backlit features.",
        attributes: ["Translucent", "Vibrant", "Ornamental"],
      },
      {
        type: "Semiprecious",
        description: "Gemstone-quality slabs like Amethyst and Agate, hand-assembled for backlit luxury.",
        attributes: ["Rare", "Jewel-Toned", "Bespoke"],
      },
      {
        type: "Rare Finds",
        description: "One-of-a-kind blocks sourced from exclusive quarries, available by appointment only.",
        attributes: ["Exclusive", "Limited Run", "Statement"],
      }
    ]
  },
  servicePillars: [
    {
      id: "01",
      title: "Custom Fabrication",
      description: "Zero-tolerance precision cutting via 5-axis Waterjet & CNC milling systems.",
      icon: "Fabrication"
    },
    {
      id: "02",
      title: "Digital Design",
      description: "Photorealistic rendering and virtual stone layouts for pre-production verification.",
      icon: "Design"
    },
    {
      id: "03",
      title: "Artistic Inlay",
      description: "Complex mosaic assembly and mixed-material integration for bespoke features.",
      icon: "Artistic"
    },
    {
      id: "04",
      title: "Installation",
      description: "White-glove onsite fitting by master masons ensuring structural permanence.",
      icon: "Safety"
    },
    {
      id: "05",
      title: "Commercial Facades",
      description: "Large-scale cladding systems engineered for high-rise exterior performance.",
      icon: "Commercial"
    }
  ],
  legacy: {
    notableProjects: [
      { name: "Vietnam Wall Replica", location: "Traveling Exhibition" },
      { name: "Navy SEAL Museum Memorial", location: "Fort Pierce, FL" },
      { name: "9/11 First Responders Memorial", location: "Various Locations" }
    ],
    affiliations: [
      "Natural Stone Institute",
      "Gary Sinise Foundation"
    ],
    expertise: "Master-level craftsmanship applied to monuments of national significance.",
  },
  contact: {
    phone: "(772) 489-9964",
    status: "Operational",
  },
};
