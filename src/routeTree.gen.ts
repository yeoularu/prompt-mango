/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PromptsImport } from './routes/prompts'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as PromptsIndexImport } from './routes/prompts_.index'
import { Route as PromptsCategoryNameImport } from './routes/prompts.$category.$name'

// Create/Update Routes

const PromptsRoute = PromptsImport.update({
  path: '/prompts',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PromptsIndexRoute = PromptsIndexImport.update({
  path: '/prompts/',
  getParentRoute: () => rootRoute,
} as any)

const PromptsCategoryNameRoute = PromptsCategoryNameImport.update({
  path: '/$category/$name',
  getParentRoute: () => PromptsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/prompts': {
      id: '/prompts'
      path: '/prompts'
      fullPath: '/prompts'
      preLoaderRoute: typeof PromptsImport
      parentRoute: typeof rootRoute
    }
    '/prompts/': {
      id: '/prompts/'
      path: '/prompts'
      fullPath: '/prompts'
      preLoaderRoute: typeof PromptsIndexImport
      parentRoute: typeof rootRoute
    }
    '/prompts/$category/$name': {
      id: '/prompts/$category/$name'
      path: '/$category/$name'
      fullPath: '/prompts/$category/$name'
      preLoaderRoute: typeof PromptsCategoryNameImport
      parentRoute: typeof PromptsImport
    }
  }
}

// Create and export the route tree

interface PromptsRouteChildren {
  PromptsCategoryNameRoute: typeof PromptsCategoryNameRoute
}

const PromptsRouteChildren: PromptsRouteChildren = {
  PromptsCategoryNameRoute: PromptsCategoryNameRoute,
}

const PromptsRouteWithChildren =
  PromptsRoute._addFileChildren(PromptsRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/prompts': typeof PromptsIndexRoute
  '/prompts/$category/$name': typeof PromptsCategoryNameRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/prompts': typeof PromptsIndexRoute
  '/prompts/$category/$name': typeof PromptsCategoryNameRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/prompts': typeof PromptsRouteWithChildren
  '/prompts/': typeof PromptsIndexRoute
  '/prompts/$category/$name': typeof PromptsCategoryNameRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/prompts' | '/prompts/$category/$name'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/prompts' | '/prompts/$category/$name'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/prompts'
    | '/prompts/'
    | '/prompts/$category/$name'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  PromptsRoute: typeof PromptsRouteWithChildren
  PromptsIndexRoute: typeof PromptsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  PromptsRoute: PromptsRouteWithChildren,
  PromptsIndexRoute: PromptsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/prompts",
        "/prompts/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/prompts": {
      "filePath": "prompts.tsx",
      "children": [
        "/prompts/$category/$name"
      ]
    },
    "/prompts/": {
      "filePath": "prompts_.index.tsx"
    },
    "/prompts/$category/$name": {
      "filePath": "prompts.$category.$name.tsx",
      "parent": "/prompts"
    }
  }
}
ROUTE_MANIFEST_END */
