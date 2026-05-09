"use client"

import { useState, useEffect } from "react"
import { Trash2, Check } from "lucide-react"
import { IOSNavBar } from "@/components/ios/ios-nav-bar"
import { IOSList, IOSListItem } from "@/components/ios/ios-list"
import { IOSAlert } from "@/components/ios/ios-alert"
import { type Space } from "@/lib/mock-data"

// 所有可用的模版分类
const allTemplates = [
  { id: "identity", name: "身份证件", icon: "🪪" },
  { id: "property", name: "房产资料", icon: "🏠" },
  { id: "vehicle", name: "车辆资料", icon: "🚗" },
  { id: "insurance", name: "保险单据", icon: "🛡️" },
  { id: "medical", name: "医疗记录", icon: "🏥" },
  { id: "education", name: "教育资料", icon: "📚" },
  { id: "contract", name: "合同协议", icon: "📝" },
  { id: "invoice", name: "发票收据", icon: "🧾" },
  { id: "bank", name: "银行流水", icon: "🏦" },
  { id: "certificate", name: "资质证书", icon: "📜" },
  { id: "project", name: "项目资料", icon: "📁" },
  { id: "license", name: "营业执照", icon: "📋" },
  { id: "tax", name: "税务资料", icon: "🧾" },
  { id: "employee", name: "员工资料", icon: "👥" },
  { id: "lease", name: "租赁合同", icon: "🏢" },
  { id: "purchase", name: "进货单据", icon: "📦" },
]

// 预设空间类型的默认模版
const spaceTypeTemplates: Record<string, string[]> = {
  family: ["identity", "property", "vehicle", "insurance", "medical", "education", "contract"],
  freelancer: ["contract", "invoice", "bank", "certificate", "project"],
  business: ["license", "tax", "contract", "employee", "lease", "purchase"],
  custom: [],
}

const spaceTypeDefaults = {
  family: { name: "家庭空间", icon: "🏠" },
  freelancer: { name: "个人职业空间", icon: "💼" },
  business: { name: "商务经营空间", icon: "🏪" },
  custom: { name: "自定义空间", icon: "📂" },
}

// 模拟：各模版内的数据数量
const templateDataCounts: Record<string, number> = {
  identity: 5,
  property: 3,
  contract: 12,
  invoice: 8,
  license: 2,
  tax: 6,
}

interface SpaceEditPageProps {
  mode: "create" | "edit"
  spaceType?: "family" | "freelancer" | "business" | "custom"
  existingSpace?: Space
  onBack: () => void
  onSave: (space: Partial<Space>) => void
  onDelete?: () => void
  onViewTemplateData?: (templateId: string, templateName: string) => void
}

export function SpaceEditPage({
  mode,
  spaceType = "custom",
  existingSpace,
  onBack,
  onSave,
  onDelete,
  onViewTemplateData,
}: SpaceEditPageProps) {
  const isEdit = mode === "edit"
  const isCustom = spaceType === "custom" || existingSpace?.type === "custom"
  
  const defaultName = isEdit 
    ? existingSpace?.name || "" 
    : spaceTypeDefaults[spaceType].name
  
  const defaultIcon = isEdit
    ? existingSpace?.icon || "📂"
    : spaceTypeDefaults[spaceType].icon

  // 编辑模式：使用空间已有的模版；创建模式：自定义空间全选，其他类型使用预设
  const getInitialTemplates = () => {
    if (isEdit) {
      // 编辑现有空间：从空间的categories获取
      return existingSpace?.categories?.map(c => c.id) || []
    } else if (isCustom) {
      // 新建自定义空间：默认全选
      return allTemplates.map(t => t.id)
    } else {
      // 新建预设空间：使用预设模版
      return spaceTypeTemplates[spaceType]
    }
  }

  const [name, setName] = useState(defaultName)
  const [icon, setIcon] = useState(defaultIcon)
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>(getInitialTemplates())
  const [initialTemplates] = useState<string[]>(getInitialTemplates())
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [templatesToRemove, setTemplatesToRemove] = useState<string[]>([])
  const [showTemplateDeleteAlert, setShowTemplateDeleteAlert] = useState(false)
  const [showMinSelectAlert, setShowMinSelectAlert] = useState(false)

  // 模拟：空间内有数据
  const spaceHasData = existingSpace ? existingSpace.documentCount > 0 : false

  useEffect(() => {
    setName(defaultName)
    setIcon(defaultIcon)
  }, [defaultName, defaultIcon])

  const toggleTemplate = (templateId: string) => {
    if (selectedTemplates.includes(templateId)) {
      // 检查是否至少保留一个
      if (selectedTemplates.length <= 1) {
        setShowMinSelectAlert(true)
        return
      }
      setSelectedTemplates((prev) => prev.filter((id) => id !== templateId))
    } else {
      setSelectedTemplates((prev) => [...prev, templateId])
    }
  }

  const handleSave = () => {
    // 检查是否有已移除的模版包含数据
    const removedTemplates = initialTemplates.filter(
      id => !selectedTemplates.includes(id)
    )
    const removedWithData = removedTemplates.filter(
      id => templateDataCounts[id] && templateDataCounts[id] > 0
    )

    if (removedWithData.length > 0) {
      setTemplatesToRemove(removedWithData)
      setShowTemplateDeleteAlert(true)
    } else {
      onSave({
        name,
        icon,
        type: spaceType,
      })
    }
  }

  const confirmSaveWithRemovedTemplates = () => {
    setShowTemplateDeleteAlert(false)
    setTemplatesToRemove([])
    onSave({
      name,
      icon,
      type: spaceType,
    })
  }

  const handleDelete = () => {
    if (spaceHasData) {
      setShowDeleteAlert(true)
    } else {
      onDelete?.()
    }
  }

  const confirmDelete = () => {
    setShowDeleteAlert(false)
    onDelete?.()
  }

  // 计算被移除模版的总数据量
  const getRemovedDataCount = () => {
    return templatesToRemove.reduce((sum, id) => sum + (templateDataCounts[id] || 0), 0)
  }

  const getRemovedTemplateNames = () => {
    return templatesToRemove
      .map(id => allTemplates.find(t => t.id === id)?.name)
      .filter(Boolean)
      .join("、")
  }

  // 判断模版是否有数据（仅在编辑模式且模版已选中时显示）
  const getTemplateDataCount = (templateId: string) => {
    if (!isEdit) return 0
    if (!initialTemplates.includes(templateId)) return 0
    return templateDataCounts[templateId] || 0
  }

  const handleDataCountClick = (e: React.MouseEvent, templateId: string, templateName: string) => {
    e.stopPropagation()
    onViewTemplateData?.(templateId, templateName)
  }

  return (
    <div className="flex flex-col min-h-full bg-muted/30">
      <IOSNavBar
        title={isEdit ? "编辑空间" : "创建空间"}
        leftAction={{
          label: "取消",
          onClick: onBack,
        }}
        rightAction={{
          label: "完成",
          onClick: handleSave,
          primary: true,
        }}
      />

      {/* 空间名称输入 */}
      <IOSList header="空间名称">
        <div className="flex items-center gap-3 px-4 py-3 bg-card">
          <button 
            className="w-10 h-10 flex items-center justify-center bg-muted rounded-xl text-2xl"
            onClick={() => {
              // 简化：切换几个预设图标
              const icons = ["🏠", "💼", "🏪", "📂", "🗂️", "📋", "🎯"]
              const currentIndex = icons.indexOf(icon)
              const nextIndex = (currentIndex + 1) % icons.length
              setIcon(icons[nextIndex])
            }}
          >
            {icon}
          </button>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入空间名称"
            className="flex-1 text-[17px] bg-transparent outline-none placeholder:text-muted-foreground/50"
          />
        </div>
      </IOSList>

      {/* 自定义空间：选择模版 */}
      {isCustom && (
        <IOSList 
          header="选择资料分类模版" 
          footer={isEdit ? "取消勾选的分类将从空间中移除" : "勾选的分类将显示在空间首页，至少选择一个分类"}
        >
          {allTemplates.map((template) => {
            const isSelected = selectedTemplates.includes(template.id)
            const dataCount = getTemplateDataCount(template.id)
            const hasData = dataCount > 0
            
            return (
              <IOSListItem
                key={template.id}
                title={template.name}
                icon={<span className="text-xl">{template.icon}</span>}
                accessory={
                  <div className="flex items-center gap-3">
                    {/* 数据数量（仅编辑模式且有数据时显示） */}
                    {hasData && (
                      <button
                        onClick={(e) => handleDataCountClick(e, template.id, template.name)}
                        className="px-2 py-0.5 bg-muted rounded-full text-[13px] text-muted-foreground font-medium active:bg-muted/70 transition-colors"
                      >
                        {dataCount} 份
                      </button>
                    )}
                    {/* iOS 风格 Checkbox */}
                    <div
                      className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-primary border-primary"
                          : "border-muted-foreground/40 bg-transparent"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground stroke-[3]" />}
                    </div>
                  </div>
                }
                onClick={() => toggleTemplate(template.id)}
              />
            )
          })}
        </IOSList>
      )}

      {/* 非自定义空间：显示预设模版（只读） */}
      {!isCustom && (
        <IOSList header="包含的资料分类" footer="此空间类型的预设分类，无法修改">
          {spaceTypeTemplates[spaceType].map((templateId) => {
            const template = allTemplates.find((t) => t.id === templateId)
            if (!template) return null
            const dataCount = getTemplateDataCount(template.id)
            const hasData = dataCount > 0
            
            return (
              <IOSListItem
                key={template.id}
                title={template.name}
                icon={<span className="text-xl">{template.icon}</span>}
                accessory={
                  hasData ? (
                    <button
                      onClick={(e) => handleDataCountClick(e, template.id, template.name)}
                      className="px-2 py-0.5 bg-muted rounded-full text-[13px] text-muted-foreground font-medium active:bg-muted/70 transition-colors"
                    >
                      {dataCount} 份
                    </button>
                  ) : undefined
                }
              />
            )
          })}
        </IOSList>
      )}

      {/* 删除空间按钮（仅编辑模式） */}
      {isEdit && onDelete && (
        <div className="px-4 mt-6">
          <button
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-2 py-3 bg-destructive/10 text-destructive rounded-xl font-medium active:bg-destructive/20 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            删除空间
          </button>
          {spaceHasData && (
            <p className="text-[13px] text-muted-foreground text-center mt-2">
              此空间包含 {existingSpace?.documentCount} 份资料
            </p>
          )}
        </div>
      )}

      {/* 底部安全区 */}
      <div className="h-8" />

      {/* 删除空间确认弹窗 */}
      <IOSAlert
        open={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        title="删除空间"
        message={`"${existingSpace?.name}"包含 ${existingSpace?.documentCount} 份资料。删除后，所有凭证将永久删除，不可恢复。`}
        buttons={[
          {
            label: "取消",
            style: "cancel",
            onClick: () => setShowDeleteAlert(false),
          },
          {
            label: "删除",
            style: "destructive",
            onClick: confirmDelete,
          },
        ]}
      />

      {/* 移除模版确认弹窗（保存时触发） */}
      <IOSAlert
        open={showTemplateDeleteAlert}
        onClose={() => setShowTemplateDeleteAlert(false)}
        title="移除分类"
        message={`您取消勾选的"${getRemovedTemplateNames()}"分类下共有 ${getRemovedDataCount()} 份资料。保存后，这些凭证将永久删除，不可恢复。`}
        buttons={[
          {
            label: "取消",
            style: "cancel",
            onClick: () => {
              setTemplatesToRemove([])
              setShowTemplateDeleteAlert(false)
            },
          },
          {
            label: "确认删除",
            style: "destructive",
            onClick: confirmSaveWithRemovedTemplates,
          },
        ]}
      />

      {/* 至少选择一个分类提示 */}
      <IOSAlert
        open={showMinSelectAlert}
        onClose={() => setShowMinSelectAlert(false)}
        title="无法取消"
        message="空间至少需要包含一个资料分类，请保留至少一个分类。"
        buttons={[
          {
            label: "我知道了",
            style: "default",
            onClick: () => setShowMinSelectAlert(false),
          },
        ]}
      />
    </div>
  )
}
