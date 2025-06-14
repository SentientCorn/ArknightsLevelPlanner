import React, { useEffect, useState } from "react";
import supabase from "../config/supabase";

interface Item {
  id: string;
  name: string;
  image_url: string;
  class_id: number;
  rarity: number;
}

// 1. Define props interface for your receiving component
interface ReceivedOp {
  selectedOperator: Item | null;
}

interface Character {
  id: number;
  name: string;
  image: string;
  level: number;
  maxLevel: number;
  targetLevel: number;
  elite: Elite;
  skills: Skill[];
  modules: Module[];
}

interface Elite {
  id: number;
  name: string;
  image: string;
  currentPromotion: number;
  targetPromotion: number;
  maxPromotion: number;
  materials: EliteMaterial[];
}

interface Skill {
  id: number;
  name: string;
  image: string;
  currentLevel: number;
  targetLevel: number;
  maxLevel: number;
  currentMastery: number;
  targetMastery: number;
  maxMastery: number;
  upgradeMaterials: SkillMaterial[];
  masteryMaterials: SkillMaterial[];
}

interface Module {
  id: number;
  name: string;
  image: string;
  currentLevel: number;
  targetLevel: number;
  maxLevel: number;
  materials: ModuleMaterial[];
}

interface EliteMaterial {
  id: number;
  name: string;
  image: string;
  required: number;
  owned: number;
  promotionLevel: number;
}

interface SkillMaterial {
  id: number;
  name: string;
  image: string;
  required: number;
  owned: number;
  level?: number;
  masteryLevel?: number;
}

interface ModuleMaterial {
  id: number;
  name: string;
  image: string;
  required: number;
  owned: number;
  moduleLevel: number;
}

const selectedCharacter: Character = {
  id: 1,
  name: "Elite Operator Alpha",
  image: "https://via.placeholder.com/200x250?text=Elite+Operator",
  level: 1,
  maxLevel: 90,
  targetLevel: 45,
  elite: {
    id: 1,
    name: "Elite Promotion",
    image: "https://via.placeholder.com/40?text=E",
    currentPromotion: 0,
    targetPromotion: 2,
    maxPromotion: 2,
    materials: [
      {
        id: 1,
        name: "Elite Chip",
        image: "https://via.placeholder.com/50?text=EC",
        required: 4,
        owned: 2,
        promotionLevel: 2
      },
      {
        id: 2,
        name: "LMD",
        image: "https://via.placeholder.com/50?text=LMD",
        required: 180000,
        owned: 85000,
        promotionLevel: 2
      }
    ]
  },
  skills: [
    {
      id: 1,
      name: "Combat Skill",
      image: "https://via.placeholder.com/40?text=S1",
      currentLevel: 1,
      targetLevel: 7,
      maxLevel: 7,
      currentMastery: 0,
      targetMastery: 2,
      maxMastery: 3,
      upgradeMaterials: [
        {
          id: 3,
          name: "Skill Summary 3",
          image: "https://via.placeholder.com/50?text=SS3",
          required: 8,
          owned: 8,
          level: 7
        }
      ],
      masteryMaterials: [
        {
          id: 4,
          name: "Skill Summary 3",
          image: "https://via.placeholder.com/50?text=SS3",
          required: 12,
          owned: 8,
          masteryLevel: 2
        },
        {
          id: 5,
          name: "Grindstone Pentahydrate",
          image: "https://via.placeholder.com/50?text=GP",
          required: 4,
          owned: 1,
          masteryLevel: 2
        }
      ]
    },
    {
      id: 2,
      name: "Tactical Skill",
      image: "https://via.placeholder.com/40?text=S2",
      currentLevel: 1,
      targetLevel: 7,
      maxLevel: 7,
      currentMastery: 0,
      targetMastery: 1,
      maxMastery: 3,
      upgradeMaterials: [
        {
          id: 6,
          name: "Skill Summary 2",
          image: "https://via.placeholder.com/50?text=SS2",
          required: 15,
          owned: 30,
          level: 7
        }
      ],
      masteryMaterials: [
        {
          id: 7,
          name: "Skill Summary 3",
          image: "https://via.placeholder.com/50?text=SS3",
          required: 6,
          owned: 8,
          masteryLevel: 1
        }
      ]
    },
    {
      id: 3,
      name: "Special Skill",
      image: "https://via.placeholder.com/40?text=S3",
      currentLevel: 1,
      targetLevel: 7,
      maxLevel: 7,
      currentMastery: 0,
      targetMastery: 3,
      maxMastery: 3,
      upgradeMaterials: [
        {
          id: 8,
          name: "Skill Summary 3",
          image: "https://via.placeholder.com/50?text=SS3",
          required: 10,
          owned: 8,
          level: 7
        }
      ],
      masteryMaterials: [
        {
          id: 9,
          name: "Polymerization Preparation",
          image: "https://via.placeholder.com/50?text=PP",
          required: 8,
          owned: 3,
          masteryLevel: 3
        }
      ]
    }
  ],
  modules: [
    {
      id: 1,
      name: "Delta Module",
      image: "https://via.placeholder.com/40?text=Δ",
      currentLevel: 0,
      targetLevel: 3,
      maxLevel: 3,
      materials: [
        {
          id: 10,
          name: "Module Data Block",
          image: "https://via.placeholder.com/50?text=MDB",
          required: 4,
          owned: 2,
          moduleLevel: 3
        },
        {
          id: 11,
          name: "Data Supplement Stick",
          image: "https://via.placeholder.com/50?text=DSS",
          required: 60,
          owned: 45,
          moduleLevel: 3
        }
      ]
    },
    {
      id: 2,
      name: "X Module",
      image: "https://via.placeholder.com/40?text=X",
      currentLevel: 0,
      targetLevel: 1,
      maxLevel: 3,
      materials: [
        {
          id: 12,
          name: "Module Data Block",
          image: "https://via.placeholder.com/50?text=MDB",
          required: 2,
          owned: 2,
          moduleLevel: 1
        }
      ]
    }
  ]
};

const fetchOperatorData = async (operatorId: string) => {
  // Fetch Elites and Elite Materials
  const { data: elites, error: eliteError } = await supabase
    .from('elites')
    .select(`
      id,
      name,
      image_url,
      lmd,
      type,
      elite_materials:elite_materials(
        quantity,
        material:materials (
          id,
          name,
          image_url
        )
      )
    `)
    .eq('operator_id', operatorId);

  // // Fetch Modules, Stages and Materials
  // const { data: modules, error: moduleError } = await supabase
  //   .from('modules')
  //   .select(`
  //     id,
  //     title,
  //     image_url,
  //     module,
  //     module_stages:module_stages (
  //       id,
  //       stage,
  //       lmd,
  //       module_materials:module_materials (
  //         quantity,
  //         material:materials (
  //           id,
  //           name,
  //           image_url
  //         )
  //       )
  //     )
  //   `)
  //   .eq('operator_id', operatorId);

  // Fetch Skill Levels and Materials
  const { data: skillLevels, error: skillError } = await supabase
    .from('skill_levels')
    .select(`
      id,
      level,
      lmd,
      skill_level_materials:skill_level_materials (
        quantity,
        material:materials (
          id,
          name,
          image_url
        )
      )
    `)
    .eq('operator_id', operatorId);

  if (eliteError  || skillError) {
    console.error("Fetching errors:", eliteError, skillError);
    return null;
  }

  return {
    elites,

    skillLevels
  };
};

const Planner: React.FC<ReceivedOp> = (selectedOperator) => {
  const [character, setCharacter] = useState<Character>(selectedCharacter);
  const [calculatedMaterials, setCalculatedMaterials] = useState<any[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    // Alert op ID of selectedOperator
    if (selectedOperator.selectedOperator) {
      console.log(`Selected Operator ID: ${selectedOperator.selectedOperator.id}`);
      fetchOperatorData(selectedOperator.selectedOperator.id).then(data => {
        console.log("Fetched Operator Data:", data);
    }
      );
    }
  
  }, [selectedOperator.selectedOperator]);


  const handleLevelChange = (newLevel: number) => {
    setCharacter(prev => ({
      ...prev,
      level: newLevel
    }));
    setIsCalculated(false);
  };

  const handleTargetLevelChange = (newTargetLevel: number) => {
    setCharacter(prev => ({
      ...prev,
      targetLevel: newTargetLevel
    }));
    setIsCalculated(false);
  };

  const handleEliteChange = (newCurrentPromotion: number, isTarget: boolean = false) => {
    if (isTarget) {
      setCharacter(prev => ({
        ...prev,
        elite: { ...prev.elite, targetPromotion: newCurrentPromotion }
      }));
    } else {
      setCharacter(prev => ({
        ...prev,
        elite: { ...prev.elite, currentPromotion: newCurrentPromotion }
      }));
    }
    setIsCalculated(false);
  };

  const handleSkillLevelChange = (skillId: number, newCurrentLevel: number, isTarget: boolean = false) => {
    setCharacter(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === skillId 
          ? isTarget 
            ? { ...skill, targetLevel: newCurrentLevel }
            : { ...skill, currentLevel: newCurrentLevel }
          : skill
      )
    }));
    setIsCalculated(false);
  };

  const handleSkillMasteryChange = (skillId: number, newCurrentMastery: number, isTarget: boolean = false) => {
    setCharacter(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === skillId 
          ? isTarget 
            ? { ...skill, targetMastery: newCurrentMastery }
            : { ...skill, currentMastery: newCurrentMastery }
          : skill
      )
    }));
    setIsCalculated(false);
  };

  const handleModuleChange = (moduleId: number, newCurrentLevel: number, isTarget: boolean = false) => {
    setCharacter(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? isTarget 
            ? { ...module, targetLevel: newCurrentLevel }
            : { ...module, currentLevel: newCurrentLevel }
          : module
      )
    }));
    setIsCalculated(false);
  };

  const getMaterialStatusColor = (required: number, owned: number) => {
    if (owned >= required) return 'text-green-600 bg-green-50 border-green-200';
    if (owned >= required * 0.5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const calculateRequiredMaterials = () => {
    const materialMap = new Map();

    // Elite promotion materials
    if (character.elite.targetPromotion > character.elite.currentPromotion) {
      character.elite.materials.forEach(material => {
        if (material.promotionLevel <= character.elite.targetPromotion && 
            material.promotionLevel > character.elite.currentPromotion) {
          const existing = materialMap.get(material.name) || { ...material, required: 0 };
          existing.required += material.required;
          materialMap.set(material.name, existing);
        }
      });
    }

    // Skill upgrade and mastery materials
    character.skills.forEach(skill => {
      if (skill.targetLevel > skill.currentLevel) {
        skill.upgradeMaterials.forEach(material => {
          if (material.level && material.level <= skill.targetLevel && 
              material.level > skill.currentLevel) {
            const existing = materialMap.get(material.name) || { ...material, required: 0 };
            existing.required += material.required;
            materialMap.set(material.name, existing);
          }
        });
      }

      if (skill.targetMastery > skill.currentMastery) {
        skill.masteryMaterials.forEach(material => {
          if (material.masteryLevel && material.masteryLevel <= skill.targetMastery && 
              material.masteryLevel > skill.currentMastery) {
            const existing = materialMap.get(material.name) || { ...material, required: 0 };
            existing.required += material.required;
            materialMap.set(material.name, existing);
          }
        });
      }
    });

    // Module materials
    character.modules.forEach(module => {
      if (module.targetLevel > module.currentLevel) {
        module.materials.forEach(material => {
          if (material.moduleLevel <= module.targetLevel && 
              material.moduleLevel > module.currentLevel) {
            const existing = materialMap.get(material.name) || { ...material, required: 0 };
            existing.required += material.required;
            materialMap.set(material.name, existing);
          }
        });
      }
    });

    const materials = Array.from(materialMap.values());
    setCalculatedMaterials(materials);
    setIsCalculated(true);
  };

  return (
    <div className="h-full w-full p-4 flex gap-4">
      {/* Character and Upgrades */}
      <div className="flex-1 space-y-4 max-h-[calc(100vh-2rem)] overflow-y-auto bg-gradient-to-br from-[#F4E5C0] to-[#E2CBAA] p-2 rounded-lg" style={{ scrollbarGutter: "stable" }}>
        {/* Selected Character */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Operator Planner</h2>
          <div className="flex items-center gap-4">
            <img 
              src={character.image} 
              alt={character.name}
              className="w-24 h-30 object-cover rounded-lg border-2 border-gray-300"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{character.name}</h3>
              
              {/* Current Level */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Current Level:</span>
                <select 
                  value={character.level}
                  onChange={(e) => handleLevelChange(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Array.from({ length: character.maxLevel }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">/{character.maxLevel}</span>
              </div>

              {/* Target Level */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Target Level:</span>
                <select 
                  value={character.targetLevel}
                  onChange={(e) => handleTargetLevelChange(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Array.from({ length: character.maxLevel - character.level + 1 }, (_, i) => (
                    <option key={i} value={character.level + i}>
                      {character.level + i}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">/{character.maxLevel}</span>
              </div>

              <p className="text-gray-600">Elite {character.elite.currentPromotion}</p>
              <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(character.level / character.maxLevel) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Elite Promotion */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-3">Elite Promotion</h3>
          <div className="p-3 rounded-lg border-2 bg-purple-100 border-purple-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <img 
                  src={character.elite.image} 
                  alt={character.elite.name}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <h4 className="font-medium">{character.elite.name}</h4>
                  <span className="text-sm text-gray-600">Elite Promotion</span>
                </div>
              </div>
            </div>
            
            {/* Current Elite */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Current Elite:</span>
              <select 
                value={character.elite.currentPromotion}
                onChange={(e) => handleEliteChange(Number(e.target.value), false)}
                className="border rounded px-2 py-1 text-sm"
              >
                {Array.from({ length: character.elite.maxPromotion + 1 }, (_, i) => (
                  <option key={i} value={i}>
                    E{i}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Elite */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Target Elite:</span>
              <select 
                value={character.elite.targetPromotion}
                onChange={(e) => handleEliteChange(Number(e.target.value), true)}
                className="border rounded px-2 py-1 text-sm"
              >
                {Array.from({ length: character.elite.maxPromotion - character.elite.currentPromotion + 1 }, (_, i) => (
                  <option key={i} value={character.elite.currentPromotion + i}>
                    E{character.elite.currentPromotion + i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <div className="space-y-3">
            {character.skills.map((skill) => (
              <div key={skill.id} className="p-3 rounded-lg border-2 bg-blue-100 border-blue-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={skill.image} 
                      alt={skill.name}
                      className="w-10 h-10 rounded"
                    />
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <span className="text-sm text-gray-600">Skill</span>
                    </div>
                  </div>
                </div>
                
                {/* Current Skill Level */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Level:</span>
                  <select 
                    value={skill.currentLevel}
                    onChange={(e) => handleSkillLevelChange(skill.id, Number(e.target.value), false)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {Array.from({ length: skill.maxLevel }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Lv.{i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Skill Level */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Target Level:</span>
                  <select 
                    value={skill.targetLevel}
                    onChange={(e) => handleSkillLevelChange(skill.id, Number(e.target.value), true)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {Array.from({ length: skill.maxLevel - skill.currentLevel + 1 }, (_, i) => (
                      <option key={i} value={skill.currentLevel + i}>
                        Lv.{skill.currentLevel + i}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Current Skill Mastery */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Mastery:</span>
                  <select 
                    value={skill.currentMastery}
                    onChange={(e) => handleSkillMasteryChange(skill.id, Number(e.target.value), false)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {Array.from({ length: skill.maxMastery + 1 }, (_, i) => (
                      <option key={i} value={i}>
                        M{i}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Skill Mastery */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Target Mastery:</span>
                  <select 
                    value={skill.targetMastery}
                    onChange={(e) => handleSkillMasteryChange(skill.id, Number(e.target.value), true)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {Array.from({ length: skill.maxMastery - skill.currentMastery + 1 }, (_, i) => (
                      <option key={i} value={skill.currentMastery + i}>
                        M{skill.currentMastery + i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modules Section */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-3">Modules</h3>
          <div className="space-y-3">
            {character.modules.map((module) => (
              <div key={module.id} className="p-3 rounded-lg border-2 bg-green-100 border-green-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={module.image} 
                      alt={module.name}
                      className="w-10 h-10 rounded"
                    />
                    <div>
                      <h4 className="font-medium">{module.name}</h4>
                      <span className="text-sm text-gray-600">Module</span>
                    </div>
                  </div>
                </div>
                
                {/* Current Module Level */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Level:</span>
                  <select 
                    value={module.currentLevel}
                    onChange={(e) => handleModuleChange(module.id, Number(e.target.value), false)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {Array.from({ length: module.maxLevel + 1 }, (_, i) => (
                      <option key={i} value={i}>
                        Lv.{i}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Module Level */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Target Level:</span>
                  <select 
                    value={module.targetLevel}
                    onChange={(e) => handleModuleChange(module.id, Number(e.target.value), true)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {Array.from({ length: module.maxLevel - module.currentLevel + 1 }, (_, i) => (
                      <option key={i} value={module.currentLevel + i}>
                        Lv.{module.currentLevel + i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Required Materials */}
      <div className="w-80">
        <div className="bg-gradient-to-br from-[#F4E5C0] to-[#E2CBAA] rounded-lg p-4 shadow h-full max-h-[calc(100vh-2rem)] overflow-y-auto" style={{ scrollbarGutter: "stable" }}>
          <div className="bg-white rounded-lg p-4 shadow mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Required Materials</h3>
              <button
                onClick={calculateRequiredMaterials}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isCalculated 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isCalculated ? '✓ Calculated' : 'Calculate'}
              </button>
            </div>
            
            <div 
              className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 border border-gray-200 rounded-lg p-2"
              style={{ scrollbarGutter: "stable" }}
            >
              {!isCalculated ? (
                <div className="text-center text-gray-500 py-8">
                  Click "Calculate" to see required materials
                </div>
              ) : calculatedMaterials.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No materials required for current targets
                </div>
              ) : (
                calculatedMaterials.map((material, index) => (
                  <div 
                    key={`${material.name}-${index}`}
                    className={`p-3 rounded-lg border ${getMaterialStatusColor(material.required, material.owned)}`}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={material.image} 
                        alt={material.name}
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{material.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs">
                            {material.owned.toLocaleString()} / {material.required.toLocaleString()}
                          </span>
                          <span className="text-xs font-medium">
                            {material.owned >= material.required 
                              ? "✓ Ready" 
                              : `Need ${(material.required - material.owned).toLocaleString()}`
                            }
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              material.owned >= material.required 
                                ? 'bg-green-500' 
                                : material.owned >= material.required * 0.5 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`}
                            style={{ 
                              width: `${Math.min((material.owned / material.required) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;