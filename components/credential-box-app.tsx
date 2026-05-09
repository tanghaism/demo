"use client"

import { useState } from "react"
import { IPhoneFrame } from "@/components/iphone-frame"
import { SpaceSelectionPage, type SpaceType } from "@/components/pages/space-selection-page"
import { SpaceHomePage } from "@/components/pages/space-home-page"
import { SpaceEditPage } from "@/components/pages/space-edit-page"
import { DocumentListPage } from "@/components/pages/document-list-page"
import { DocumentDetailPage } from "@/components/pages/document-detail-page"
import { AddDocumentPage } from "@/components/pages/add-document-page"
import { RemindersPage } from "@/components/pages/reminders-page"
import { ExportPage } from "@/components/pages/export-page"
import { SettingsPage } from "@/components/pages/settings-page"
import { type Space, type Category, spaces } from "@/lib/mock-data"

type PageType =
  | "space-selection"
  | "space-home"
  | "space-edit"
  | "document-list"
  | "document-detail"
  | "add-document"
  | "reminders"
  | "export"
  | "settings"

interface NavigationState {
  page: PageType
  space?: Space
  category?: Category
  documentId?: string
  spaceEditMode?: "create" | "edit"
  spaceType?: SpaceType
}

export function CredentialBoxApp() {
  const [nav, setNav] = useState<NavigationState>({
    page: "space-selection",
  })

  const renderPage = () => {
    switch (nav.page) {
      case "space-selection":
        return (
          <SpaceSelectionPage
            onSelectSpace={(space) =>
              setNav({ page: "space-home", space })
            }
            onCreateSpace={(type) => {
              setNav({ 
                page: "space-edit", 
                spaceEditMode: "create",
                spaceType: type,
              })
            }}
            onEditSpace={(space) => {
              setNav({
                page: "space-edit",
                space,
                spaceEditMode: "edit",
                spaceType: space.type,
              })
            }}
            onDeleteSpace={(space) => {
              // Demo: just log the deletion
              console.log("Deleted space:", space.name)
            }}
          />
        )

      case "space-edit":
        return (
          <SpaceEditPage
            mode={nav.spaceEditMode || "create"}
            spaceType={nav.spaceType}
            existingSpace={nav.space}
            onBack={() => setNav({ page: "space-selection" })}
            onSave={(spaceData) => {
              // Demo: navigate to the space or back to selection
              if (nav.spaceEditMode === "create") {
                // Create new space - demo: use first space as template
                const newSpace: Space = {
                  ...spaces[0],
                  id: Date.now().toString(),
                  name: spaceData.name || "新空间",
                  icon: spaceData.icon || "📂",
                  type: spaceData.type || "custom",
                  documentCount: 0,
                  lastUpdated: new Date().toISOString().slice(0, 10),
                }
                setNav({ page: "space-home", space: newSpace })
              } else {
                // Edit existing space
                const updatedSpace: Space = {
                  ...nav.space!,
                  name: spaceData.name || nav.space!.name,
                  icon: spaceData.icon || nav.space!.icon,
                }
                setNav({ page: "space-home", space: updatedSpace })
              }
            }}
            onDelete={nav.spaceEditMode === "edit" ? () => {
              // Demo: just go back to selection
              setNav({ page: "space-selection" })
            } : undefined}
          />
        )

      case "space-home":
        return (
          <SpaceHomePage
            space={nav.space!}
            onBack={() => setNav({ page: "space-selection" })}
            onSelectCategory={(category) =>
              setNav({ ...nav, page: "document-list", category })
            }
            onSelectDocument={(documentId) =>
              setNav({ ...nav, page: "document-detail", documentId })
            }
            onAddDocument={() => setNav({ ...nav, page: "add-document" })}
            onOpenReminders={() => setNav({ ...nav, page: "reminders" })}
            onOpenSettings={() => setNav({ ...nav, page: "settings" })}
          />
        )

      case "document-list":
        return (
          <DocumentListPage
            category={nav.category!}
            onBack={() => setNav({ ...nav, page: "space-home", category: undefined })}
            onSelectDocument={(documentId) =>
              setNav({ ...nav, page: "document-detail", documentId })
            }
            onAddDocument={() => setNav({ ...nav, page: "add-document" })}
          />
        )

      case "document-detail":
        return (
          <DocumentDetailPage
            documentId={nav.documentId!}
            onBack={() => {
              if (nav.category) {
                setNav({ ...nav, page: "document-list", documentId: undefined })
              } else {
                setNav({ ...nav, page: "space-home", documentId: undefined })
              }
            }}
            onEdit={() => setNav({ ...nav, page: "add-document" })}
            onExport={() => setNav({ ...nav, page: "export" })}
          />
        )

      case "add-document":
        return (
          <AddDocumentPage
            onBack={() => {
              if (nav.documentId) {
                setNav({ ...nav, page: "document-detail" })
              } else if (nav.category) {
                setNav({ ...nav, page: "document-list" })
              } else {
                setNav({ ...nav, page: "space-home" })
              }
            }}
            onSave={() => {
              if (nav.category) {
                setNav({ ...nav, page: "document-list" })
              } else {
                setNav({ ...nav, page: "space-home" })
              }
            }}
          />
        )

      case "reminders":
        return (
          <RemindersPage
            onBack={() => setNav({ ...nav, page: "space-home" })}
            onSelectDocument={(documentId) =>
              setNav({ ...nav, page: "document-detail", documentId })
            }
          />
        )

      case "export":
        return (
          <ExportPage
            documentId={nav.documentId}
            onBack={() => {
              if (nav.documentId) {
                setNav({ ...nav, page: "document-detail" })
              } else {
                setNav({ ...nav, page: "space-home" })
              }
            }}
          />
        )

      case "settings":
        return (
          <SettingsPage
            onBack={() => setNav({ ...nav, page: "space-home" })}
          />
        )

      default:
        return null
    }
  }

  return <IPhoneFrame>{renderPage()}</IPhoneFrame>
}
