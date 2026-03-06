---
"react-bnb-gallery": minor
---

Improve gallery customization with a new theming layer and component-slot API.

- Add `components` prop to replace internal UI slots (`Overlay`, `PhotoCounter`, `ModalContainer`, `CloseButton`, `PrevButton`, `NextButton`, `Photo`, `Caption`, `Thumbnail`, `TogglePhotoList`).
- Add `classNames` and `styles` props for lightweight styling overrides without replacing internal rendering.
- Export new customization types (`GalleryComponents`, `GalleryClassNames`, `GalleryStyles`, and slot prop types) from the package entrypoint.
- Update docs with a dedicated "Theming & Component Slots" section and usage examples.
