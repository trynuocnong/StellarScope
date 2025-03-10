export interface EarthImageRes {
    identifier: string
    caption: string
    image: string
    version: string
    centroid_coordinates: CentroidCoordinates
    dscovr_j2000_position: SpacePosition
    lunar_j2000_position: SpacePosition
    sun_j2000_position: SpacePosition
    attitude_quaternions: AttitudeQuaternions
    date: string
    coords: Coords
}

export interface Coords {
    centroid_coordinates: CentroidCoordinates
    dscovr_j2000_position: SpacePosition
    lunar_j2000_position: SpacePosition
    sun_j2000_position: SpacePosition
    attitude_quaternions: AttitudeQuaternions
}

export interface CentroidCoordinates {
    lat: number
    lon: number
}

export interface AttitudeQuaternions {
    q0: number
    q1: number
    q2: number
    q3: number
}

export interface SpacePosition {
    x: number
    y: number
    z: number
}

