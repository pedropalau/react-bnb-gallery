import * as React from 'react'

export type Props = {
    /**
     * Default photo to show.
     */
    activePhotoIndex?: number
    /**
     * Executed when a photo is pressed.
     */
    activePhotoPressed?: () => void
    /**
     * Executed when left key of the keyboard is pressed.
     */
    leftKeyPressed?: () => void
    /**
     * Called when next control button is pressed.
     */
    nextButtonPressed?: () => void
    /**
     * Called when the modal is going to close.
     */
    onClose: () => void
    /**
     * Preload number photos.
     */
    preloadSize?: number
    /**
     * Called when previous control button is pressed.
     */
    prevButtonPressed?: () => void
    /**
     * Array of photos.
     * It can be an array of photos URLs or an array of objects.
     */
    photos: Photo[] | string[]
    /**
     * Custom labels object.
     */
    phrases?: object
    /**
     * Called when right key of the keyboard is pressed.
     */
    rightKeyPressed?: () => void
    /**
     * Shows the modal when initialized.
     */
    show?: boolean
    /**
     * Whether the gallery should show thumbnails.
     */
    showThumbnails?: boolean
    /**
     * Whether the gallery should react to keyboard events.
     */
    keyboard?: boolean
    /**
     * Whether the gallery should cycle continuously or have hard stops.
     */
    wrap?: boolean
    /**
     * Sets the opacity level for the component background.
     */
    opacity?: number
    /**
     * Sets the background color of the gallery component.
     */
    backgroundColor?: string
    /**
     * Specifies the stack order of the component.
     */
    zIndex?: number
};

export type Photo = {
    /**
     * The source (`src`) of the photo.
     */
    photo: string
    /**
     * The current number of the photo.
     */
    number?: number
    /**
     * Short description of the photo.
     */
    caption?: string
    /**
     * Secondary description.
     * Can be used to show the photo author or the name or
     * the place where it was taken.
     */
    subcaption?: string
    /**
     * The url of the photo thumbnail.
     * The preferred size for each thumbnail is `100x67`.
     */
    thumbnail?: string
}

export type ReactBnbGalleryInterface = React.ComponentClass<Props>

declare const ReactBnbGallery: ReactBnbGalleryInterface

export default ReactBnbGallery
