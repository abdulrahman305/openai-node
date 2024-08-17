// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

// deno-lint-ignore-file no-explicit-any no-empty-interface

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUObjectBase {
  label: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUObjectDescriptorBase {
  label?: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUSupportedLimits {
  maxTextureDimension1D?: number;
  maxTextureDimension2D?: number;
  maxTextureDimension3D?: number;
  maxTextureArrayLayers?: number;
  maxBindGroups?: number;
  maxBindingsPerBindGroup?: number;
  maxDynamicUniformBuffersPerPipelineLayout?: number;
  maxDynamicStorageBuffersPerPipelineLayout?: number;
  maxSampledTexturesPerShaderStage?: number;
  maxSamplersPerShaderStage?: number;
  maxStorageBuffersPerShaderStage?: number;
  maxStorageTexturesPerShaderStage?: number;
  maxUniformBuffersPerShaderStage?: number;
  maxUniformBufferBindingSize?: number;
  maxStorageBufferBindingSize?: number;
  minUniformBufferOffsetAlignment?: number;
  minStorageBufferOffsetAlignment?: number;
  maxVertexBuffers?: number;
  maxBufferSize?: number;
  maxVertexAttributes?: number;
  maxVertexBufferArrayStride?: number;
  maxInterStageShaderComponents?: number;
  maxColorAttachments?: number;
  maxColorAttachmentBytesPerSample?: number;
  maxComputeWorkgroupStorageSize?: number;
  maxComputeInvocationsPerWorkgroup?: number;
  maxComputeWorkgroupSizeX?: number;
  maxComputeWorkgroupSizeY?: number;
  maxComputeWorkgroupSizeZ?: number;
  maxComputeWorkgroupsPerDimension?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUSupportedFeatures {
  forEach(
    callbackfn: (
      value: GPUFeatureName,
      value2: GPUFeatureName,
      set: Set<GPUFeatureName>,
    ) => void,
    thisArg?: any,
  ): void;
  has(value: GPUFeatureName): boolean;
  size: number;
  [Symbol.iterator](): IterableIterator<GPUFeatureName>;
  entries(): IterableIterator<[GPUFeatureName, GPUFeatureName]>;
  keys(): IterableIterator<GPUFeatureName>;
  values(): IterableIterator<GPUFeatureName>;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUAdapterInfo {
  readonly vendor: string;
  readonly architecture: string;
  readonly device: string;
  readonly description: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPU {
  requestAdapter(
    options?: GPURequestAdapterOptions,
  ): Promise<GPUAdapter | null>;
  getPreferredCanvasFormat(): GPUTextureFormat;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPURequestAdapterOptions {
  powerPreference?: GPUPowerPreference;
  forceFallbackAdapter?: boolean;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUPowerPreference = "low-power" | "high-performance";

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUAdapter {
  readonly features: GPUSupportedFeatures;
  readonly limits: GPUSupportedLimits;
  readonly isFallbackAdapter: boolean;

  requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
  requestAdapterInfo(): Promise<GPUAdapterInfo>;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUDeviceDescriptor extends GPUObjectDescriptorBase {
  requiredFeatures?: GPUFeatureName[];
  requiredLimits?: Record<string, number>;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUFeatureName =
  | "depth-clip-control"
  | "depth32float-stencil8"
  | "pipeline-statistics-query"
  | "texture-compression-bc"
  | "texture-compression-etc2"
  | "texture-compression-astc"
  | "timestamp-query"
  | "indirect-first-instance"
  | "shader-f16"
  | "rg11b10ufloat-renderable"
  | "bgra8unorm-storage"
  | "float32-filterable"
  // extended from spec
  | "mappable-primary-buffers"
  | "sampled-texture-binding-array"
  | "sampled-texture-array-dynamic-indexing"
  | "sampled-texture-array-non-uniform-indexing"
  | "unsized-binding-array"
  | "multi-draw-indirect"
  | "multi-draw-indirect-count"
  | "push-constants"
  | "address-mode-clamp-to-border"
  | "texture-adapter-specific-format-features"
  | "shader-float64"
  | "vertex-attribute-64bit";

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUDevice extends EventTarget implements GPUObjectBase {
  label: string;

  readonly lost: Promise<GPUDeviceLostInfo>;
  pushErrorScope(filter: GPUErrorFilter): undefined;
  popErrorScope(): Promise<GPUError | null>;

  readonly features: GPUSupportedFeatures;
  readonly limits: GPUSupportedLimits;
  readonly queue: GPUQueue;

  destroy(): undefined;

  createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
  createTexture(descriptor: GPUTextureDescriptor): GPUTexture;
  createSampler(descriptor?: GPUSamplerDescriptor): GPUSampler;

  createBindGroupLayout(
    descriptor: GPUBindGroupLayoutDescriptor,
  ): GPUBindGroupLayout;
  createPipelineLayout(
    descriptor: GPUPipelineLayoutDescriptor,
  ): GPUPipelineLayout;
  createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup;

  createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
  createComputePipeline(
    descriptor: GPUComputePipelineDescriptor,
  ): GPUComputePipeline;
  createRenderPipeline(
    descriptor: GPURenderPipelineDescriptor,
  ): GPURenderPipeline;
  createComputePipelineAsync(
    descriptor: GPUComputePipelineDescriptor,
  ): Promise<GPUComputePipeline>;
  createRenderPipelineAsync(
    descriptor: GPURenderPipelineDescriptor,
  ): Promise<GPURenderPipeline>;

  createCommandEncoder(
    descriptor?: GPUCommandEncoderDescriptor,
  ): GPUCommandEncoder;
  createRenderBundleEncoder(
    descriptor: GPURenderBundleEncoderDescriptor,
  ): GPURenderBundleEncoder;

  createQuerySet(descriptor: GPUQuerySetDescriptor): GPUQuerySet;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUBuffer implements GPUObjectBase {
  label: string;

  readonly size: number;
  readonly usage: GPUFlagsConstant;
  readonly mapState: GPUBufferMapState;

  mapAsync(
    mode: GPUMapModeFlags,
    offset?: number,
    size?: number,
  ): Promise<undefined>;
  getMappedRange(offset?: number, size?: number): ArrayBuffer;
  unmap(): undefined;

  destroy(): undefined;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUBufferMapState = "unmapped" | "pending" | "mapped";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUBufferDescriptor extends GPUObjectDescriptorBase {
  size: number;
  usage: GPUBufferUsageFlags;
  mappedAtCreation?: boolean;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUBufferUsageFlags = number;

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUFlagsConstant = number;

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUBufferUsage {
  static MAP_READ: 0x0001;
  static MAP_WRITE: 0x0002;
  static COPY_SRC: 0x0004;
  static COPY_DST: 0x0008;
  static INDEX: 0x0010;
  static VERTEX: 0x0020;
  static UNIFORM: 0x0040;
  static STORAGE: 0x0080;
  static INDIRECT: 0x0100;
  static QUERY_RESOLVE: 0x0200;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUMapModeFlags = number;

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUMapMode {
  static READ: 0x0001;
  static WRITE: 0x0002;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUTexture implements GPUObjectBase {
  label: string;

  createView(descriptor?: GPUTextureViewDescriptor): GPUTextureView;
  destroy(): undefined;

  readonly width: number;
  readonly height: number;
  readonly depthOrArrayLayers: number;
  readonly mipLevelCount: number;
  readonly sampleCount: number;
  readonly dimension: GPUTextureDimension;
  readonly format: GPUTextureFormat;
  readonly usage: GPUFlagsConstant;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUTextureDescriptor extends GPUObjectDescriptorBase {
  size: GPUExtent3D;
  mipLevelCount?: number;
  sampleCount?: number;
  dimension?: GPUTextureDimension;
  format: GPUTextureFormat;
  usage: GPUTextureUsageFlags;
  viewFormats?: GPUTextureFormat[];
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUTextureDimension = "1d" | "2d" | "3d";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUTextureUsageFlags = number;

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUTextureUsage {
  static COPY_SRC: 0x01;
  static COPY_DST: 0x02;
  static TEXTURE_BINDING: 0x04;
  static STORAGE_BINDING: 0x08;
  static RENDER_ATTACHMENT: 0x10;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUTextureView implements GPUObjectBase {
  label: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUTextureViewDescriptor extends GPUObjectDescriptorBase {
  format?: GPUTextureFormat;
  dimension?: GPUTextureViewDimension;
  aspect?: GPUTextureAspect;
  baseMipLevel?: number;
  mipLevelCount?: number;
  baseArrayLayer?: number;
  arrayLayerCount?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUTextureViewDimension =
  | "1d"
  | "2d"
  | "2d-array"
  | "cube"
  | "cube-array"
  | "3d";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUTextureAspect = "all" | "stencil-only" | "depth-only";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUTextureFormat =
  | "r8unorm"
  | "r8snorm"
  | "r8uint"
  | "r8sint"
  | "r16uint"
  | "r16sint"
  | "r16float"
  | "rg8unorm"
  | "rg8snorm"
  | "rg8uint"
  | "rg8sint"
  | "r32uint"
  | "r32sint"
  | "r32float"
  | "rg16uint"
  | "rg16sint"
  | "rg16float"
  | "rgba8unorm"
  | "rgba8unorm-srgb"
  | "rgba8snorm"
  | "rgba8uint"
  | "rgba8sint"
  | "bgra8unorm"
  | "bgra8unorm-srgb"
  | "rgb9e5ufloat"
  | "rgb10a2uint"
  | "rgb10a2unorm"
  | "rg11b10ufloat"
  | "rg32uint"
  | "rg32sint"
  | "rg32float"
  | "rgba16uint"
  | "rgba16sint"
  | "rgba16float"
  | "rgba32uint"
  | "rgba32sint"
  | "rgba32float"
  | "stencil8"
  | "depth16unorm"
  | "depth24plus"
  | "depth24plus-stencil8"
  | "depth32float"
  | "depth32float-stencil8"
  | "bc1-rgba-unorm"
  | "bc1-rgba-unorm-srgb"
  | "bc2-rgba-unorm"
  | "bc2-rgba-unorm-srgb"
  | "bc3-rgba-unorm"
  | "bc3-rgba-unorm-srgb"
  | "bc4-r-unorm"
  | "bc4-r-snorm"
  | "bc5-rg-unorm"
  | "bc5-rg-snorm"
  | "bc6h-rgb-ufloat"
  | "bc6h-rgb-float"
  | "bc7-rgba-unorm"
  | "bc7-rgba-unorm-srgb"
  | "etc2-rgb8unorm"
  | "etc2-rgb8unorm-srgb"
  | "etc2-rgb8a1unorm"
  | "etc2-rgb8a1unorm-srgb"
  | "etc2-rgba8unorm"
  | "etc2-rgba8unorm-srgb"
  | "eac-r11unorm"
  | "eac-r11snorm"
  | "eac-rg11unorm"
  | "eac-rg11snorm"
  | "astc-4x4-unorm"
  | "astc-4x4-unorm-srgb"
  | "astc-5x4-unorm"
  | "astc-5x4-unorm-srgb"
  | "astc-5x5-unorm"
  | "astc-5x5-unorm-srgb"
  | "astc-6x5-unorm"
  | "astc-6x5-unorm-srgb"
  | "astc-6x6-unorm"
  | "astc-6x6-unorm-srgb"
  | "astc-8x5-unorm"
  | "astc-8x5-unorm-srgb"
  | "astc-8x6-unorm"
  | "astc-8x6-unorm-srgb"
  | "astc-8x8-unorm"
  | "astc-8x8-unorm-srgb"
  | "astc-10x5-unorm"
  | "astc-10x5-unorm-srgb"
  | "astc-10x6-unorm"
  | "astc-10x6-unorm-srgb"
  | "astc-10x8-unorm"
  | "astc-10x8-unorm-srgb"
  | "astc-10x10-unorm"
  | "astc-10x10-unorm-srgb"
  | "astc-12x10-unorm"
  | "astc-12x10-unorm-srgb"
  | "astc-12x12-unorm"
  | "astc-12x12-unorm-srgb";

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUSampler implements GPUObjectBase {
  label: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUSamplerDescriptor extends GPUObjectDescriptorBase {
  addressModeU?: GPUAddressMode;
  addressModeV?: GPUAddressMode;
  addressModeW?: GPUAddressMode;
  magFilter?: GPUFilterMode;
  minFilter?: GPUFilterMode;
  mipmapFilter?: GPUMipmapFilterMode;
  lodMinClamp?: number;
  lodMaxClamp?: number;
  compare?: GPUCompareFunction;
  maxAnisotropy?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUAddressMode = "clamp-to-edge" | "repeat" | "mirror-repeat";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUFilterMode = "nearest" | "linear";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUMipmapFilterMode = "nearest" | "linear";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUCompareFunction =
  | "never"
  | "less"
  | "equal"
  | "less-equal"
  | "greater"
  | "not-equal"
  | "greater-equal"
  | "always";

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUBindGroupLayout implements GPUObjectBase {
  label: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUBindGroupLayoutDescriptor extends GPUObjectDescriptorBase {
  entries: GPUBindGroupLayoutEntry[];
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUBindGroupLayoutEntry {
  binding: number;
  visibility: GPUShaderStageFlags;

  buffer?: GPUBufferBindingLayout;
  sampler?: GPUSamplerBindingLayout;
  texture?: GPUTextureBindingLayout;
  storageTexture?: GPUStorageTextureBindingLayout;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUShaderStageFlags = number;

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUShaderStage {
  static VERTEX: 0x1;
  static FRAGMENT: 0x2;
  static COMPUTE: 0x4;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUBufferBindingLayout {
  type?: GPUBufferBindingType;
  hasDynamicOffset?: boolean;
  minBindingSize?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUBufferBindingType = "uniform" | "storage" | "read-only-storage";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUSamplerBindingLayout {
  type?: GPUSamplerBindingType;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUSamplerBindingType =
  | "filtering"
  | "non-filtering"
  | "comparison";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUTextureBindingLayout {
  sampleType?: GPUTextureSampleType;
  viewDimension?: GPUTextureViewDimension;
  multisampled?: boolean;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUTextureSampleType =
  | "float"
  | "unfilterable-float"
  | "depth"
  | "sint"
  | "uint";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUStorageTextureAccess =
  | "write-only"
  | "read-only"
  | "read-write";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUStorageTextureBindingLayout {
  access: GPUStorageTextureAccess;
  format: GPUTextureFormat;
  viewDimension?: GPUTextureViewDimension;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUBindGroup implements GPUObjectBase {
  label: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUBindGroupDescriptor extends GPUObjectDescriptorBase {
  layout: GPUBindGroupLayout;
  entries: GPUBindGroupEntry[];
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUBindingResource =
  | GPUSampler
  | GPUTextureView
  | GPUBufferBinding;

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUBindGroupEntry {
  binding: number;
  resource: GPUBindingResource;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUBufferBinding {
  buffer: GPUBuffer;
  offset?: number;
  size?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUPipelineLayout implements GPUObjectBase {
  label: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUPipelineLayoutDescriptor extends GPUObjectDescriptorBase {
  bindGroupLayouts: GPUBindGroupLayout[];
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUCompilationMessageType = "error" | "warning" | "info";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUCompilationMessage {
  readonly message: string;
  readonly type: GPUCompilationMessageType;
  readonly lineNum: number;
  readonly linePos: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUCompilationInfo {
  readonly messages: ReadonlyArray<GPUCompilationMessage>;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUPipelineError extends DOMException {
  constructor(message?: string, options?: GPUPipelineErrorInit);

  readonly reason: GPUPipelineErrorReason;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUPipelineErrorInit {
  reason: GPUPipelineErrorReason;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUPipelineErrorReason = "validation" | "internal";

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUShaderModule implements GPUObjectBase {
  label: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUShaderModuleDescriptor extends GPUObjectDescriptorBase {
  code: string;
  sourceMap?: any;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUAutoLayoutMode = "auto";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUPipelineDescriptorBase extends GPUObjectDescriptorBase {
  layout: GPUPipelineLayout | GPUAutoLayoutMode;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUPipelineBase {
  getBindGroupLayout(index: number): GPUBindGroupLayout;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUProgrammableStage {
  module: GPUShaderModule;
  entryPoint?: string;
  constants?: Record<string, number>;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUComputePipeline implements GPUObjectBase, GPUPipelineBase {
  label: string;

  getBindGroupLayout(index: number): GPUBindGroupLayout;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUComputePipelineDescriptor
  extends GPUPipelineDescriptorBase {
  compute: GPUProgrammableStage;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPURenderPipeline implements GPUObjectBase, GPUPipelineBase {
  label: string;

  getBindGroupLayout(index: number): GPUBindGroupLayout;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPURenderPipelineDescriptor
  extends GPUPipelineDescriptorBase {
  vertex: GPUVertexState;
  primitive?: GPUPrimitiveState;
  depthStencil?: GPUDepthStencilState;
  multisample?: GPUMultisampleState;
  fragment?: GPUFragmentState;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUPrimitiveState {
  topology?: GPUPrimitiveTopology;
  stripIndexFormat?: GPUIndexFormat;
  frontFace?: GPUFrontFace;
  cullMode?: GPUCullMode;
  unclippedDepth?: boolean;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUPrimitiveTopology =
  | "point-list"
  | "line-list"
  | "line-strip"
  | "triangle-list"
  | "triangle-strip";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUFrontFace = "ccw" | "cw";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUCullMode = "none" | "front" | "back";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUMultisampleState {
  count?: number;
  mask?: number;
  alphaToCoverageEnabled?: boolean;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUFragmentState extends GPUProgrammableStage {
  targets: (GPUColorTargetState | null)[];
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUColorTargetState {
  format: GPUTextureFormat;

  blend?: GPUBlendState;
  writeMask?: GPUColorWriteFlags;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUBlendState {
  color: GPUBlendComponent;
  alpha: GPUBlendComponent;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUColorWriteFlags = number;

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUColorWrite {
  static RED: 0x1;
  static GREEN: 0x2;
  static BLUE: 0x4;
  static ALPHA: 0x8;
  static ALL: 0xF;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUBlendComponent {
  operation?: GPUBlendOperation;
  srcFactor?: GPUBlendFactor;
  dstFactor?: GPUBlendFactor;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUBlendFactor =
  | "zero"
  | "one"
  | "src"
  | "one-minus-src"
  | "src-alpha"
  | "one-minus-src-alpha"
  | "dst"
  | "one-minus-dst"
  | "dst-alpha"
  | "one-minus-dst-alpha"
  | "src-alpha-saturated"
  | "constant"
  | "one-minus-constant";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUBlendOperation =
  | "add"
  | "subtract"
  | "reverse-subtract"
  | "min"
  | "max";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUDepthStencilState {
  format: GPUTextureFormat;

  depthWriteEnabled: boolean;
  depthCompare: GPUCompareFunction;

  stencilFront?: GPUStencilFaceState;
  stencilBack?: GPUStencilFaceState;

  stencilReadMask?: number;
  stencilWriteMask?: number;

  depthBias?: number;
  depthBiasSlopeScale?: number;
  depthBiasClamp?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUStencilFaceState {
  compare?: GPUCompareFunction;
  failOp?: GPUStencilOperation;
  depthFailOp?: GPUStencilOperation;
  passOp?: GPUStencilOperation;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUStencilOperation =
  | "keep"
  | "zero"
  | "replace"
  | "invert"
  | "increment-clamp"
  | "decrement-clamp"
  | "increment-wrap"
  | "decrement-wrap";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUIndexFormat = "uint16" | "uint32";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUVertexFormat =
  | "uint8x2"
  | "uint8x4"
  | "sint8x2"
  | "sint8x4"
  | "unorm8x2"
  | "unorm8x4"
  | "snorm8x2"
  | "snorm8x4"
  | "uint16x2"
  | "uint16x4"
  | "sint16x2"
  | "sint16x4"
  | "unorm16x2"
  | "unorm16x4"
  | "snorm16x2"
  | "snorm16x4"
  | "float16x2"
  | "float16x4"
  | "float32"
  | "float32x2"
  | "float32x3"
  | "float32x4"
  | "uint32"
  | "uint32x2"
  | "uint32x3"
  | "uint32x4"
  | "sint32"
  | "sint32x2"
  | "sint32x3"
  | "sint32x4"
  | "unorm10-10-10-2";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUVertexStepMode = "vertex" | "instance";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUVertexState extends GPUProgrammableStage {
  buffers?: (GPUVertexBufferLayout | null)[];
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUVertexBufferLayout {
  arrayStride: number;
  stepMode?: GPUVertexStepMode;
  attributes: GPUVertexAttribute[];
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUVertexAttribute {
  format: GPUVertexFormat;
  offset: number;

  shaderLocation: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUImageDataLayout {
  offset?: number;
  bytesPerRow?: number;
  rowsPerImage?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUCommandBuffer implements GPUObjectBase {
  label: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUCommandBufferDescriptor extends GPUObjectDescriptorBase {}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUCommandEncoder implements GPUObjectBase {
  label: string;

  beginRenderPass(descriptor: GPURenderPassDescriptor): GPURenderPassEncoder;
  beginComputePass(
    descriptor?: GPUComputePassDescriptor,
  ): GPUComputePassEncoder;

  copyBufferToBuffer(
    source: GPUBuffer,
    sourceOffset: number,
    destination: GPUBuffer,
    destinationOffset: number,
    size: number,
  ): undefined;

  copyBufferToTexture(
    source: GPUImageCopyBuffer,
    destination: GPUImageCopyTexture,
    copySize: GPUExtent3D,
  ): undefined;

  copyTextureToBuffer(
    source: GPUImageCopyTexture,
    destination: GPUImageCopyBuffer,
    copySize: GPUExtent3D,
  ): undefined;

  copyTextureToTexture(
    source: GPUImageCopyTexture,
    destination: GPUImageCopyTexture,
    copySize: GPUExtent3D,
  ): undefined;

  clearBuffer(
    destination: GPUBuffer,
    destinationOffset?: number,
    size?: number,
  ): undefined;

  pushDebugGroup(groupLabel: string): undefined;
  popDebugGroup(): undefined;
  insertDebugMarker(markerLabel: string): undefined;

  writeTimestamp(querySet: GPUQuerySet, queryIndex: number): undefined;

  resolveQuerySet(
    querySet: GPUQuerySet,
    firstQuery: number,
    queryCount: number,
    destination: GPUBuffer,
    destinationOffset: number,
  ): undefined;

  finish(descriptor?: GPUCommandBufferDescriptor): GPUCommandBuffer;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUCommandEncoderDescriptor extends GPUObjectDescriptorBase {}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUImageCopyBuffer extends GPUImageDataLayout {
  buffer: GPUBuffer;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUImageCopyTexture {
  texture: GPUTexture;
  mipLevel?: number;
  origin?: GPUOrigin3D;
  aspect?: GPUTextureAspect;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUProgrammablePassEncoder {
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup,
    dynamicOffsets?: number[],
  ): undefined;

  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup,
    dynamicOffsetsData: Uint32Array,
    dynamicOffsetsDataStart: number,
    dynamicOffsetsDataLength: number,
  ): undefined;

  pushDebugGroup(groupLabel: string): undefined;
  popDebugGroup(): undefined;
  insertDebugMarker(markerLabel: string): undefined;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUComputePassEncoder
  implements GPUObjectBase, GPUProgrammablePassEncoder {
  label: string;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup,
    dynamicOffsets?: number[],
  ): undefined;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup,
    dynamicOffsetsData: Uint32Array,
    dynamicOffsetsDataStart: number,
    dynamicOffsetsDataLength: number,
  ): undefined;
  pushDebugGroup(groupLabel: string): undefined;
  popDebugGroup(): undefined;
  insertDebugMarker(markerLabel: string): undefined;
  setPipeline(pipeline: GPUComputePipeline): undefined;
  dispatchWorkgroups(x: number, y?: number, z?: number): undefined;
  dispatchWorkgroupsIndirect(
    indirectBuffer: GPUBuffer,
    indirectOffset: number,
  ): undefined;

  end(): undefined;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUComputePassTimestampWrites {
  querySet: GPUQuerySet;
  beginningOfPassWriteIndex?: number;
  endOfPassWriteIndex?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUComputePassDescriptor extends GPUObjectDescriptorBase {
  timestampWrites?: GPUComputePassTimestampWrites;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPURenderEncoderBase {
  setPipeline(pipeline: GPURenderPipeline): undefined;

  setIndexBuffer(
    buffer: GPUBuffer,
    indexFormat: GPUIndexFormat,
    offset?: number,
    size?: number,
  ): undefined;
  setVertexBuffer(
    slot: number,
    buffer: GPUBuffer,
    offset?: number,
    size?: number,
  ): undefined;

  draw(
    vertexCount: number,
    instanceCount?: number,
    firstVertex?: number,
    firstInstance?: number,
  ): undefined;
  drawIndexed(
    indexCount: number,
    instanceCount?: number,
    firstIndex?: number,
    baseVertex?: number,
    firstInstance?: number,
  ): undefined;

  drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined;
  drawIndexedIndirect(
    indirectBuffer: GPUBuffer,
    indirectOffset: number,
  ): undefined;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPURenderPassEncoder
  implements GPUObjectBase, GPUProgrammablePassEncoder, GPURenderEncoderBase {
  label: string;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup,
    dynamicOffsets?: number[],
  ): undefined;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup,
    dynamicOffsetsData: Uint32Array,
    dynamicOffsetsDataStart: number,
    dynamicOffsetsDataLength: number,
  ): undefined;
  pushDebugGroup(groupLabel: string): undefined;
  popDebugGroup(): undefined;
  insertDebugMarker(markerLabel: string): undefined;
  setPipeline(pipeline: GPURenderPipeline): undefined;
  setIndexBuffer(
    buffer: GPUBuffer,
    indexFormat: GPUIndexFormat,
    offset?: number,
    size?: number,
  ): undefined;
  setVertexBuffer(
    slot: number,
    buffer: GPUBuffer,
    offset?: number,
    size?: number,
  ): undefined;
  draw(
    vertexCount: number,
    instanceCount?: number,
    firstVertex?: number,
    firstInstance?: number,
  ): undefined;
  drawIndexed(
    indexCount: number,
    instanceCount?: number,
    firstIndex?: number,
    baseVertex?: number,
    firstInstance?: number,
  ): undefined;
  drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined;
  drawIndexedIndirect(
    indirectBuffer: GPUBuffer,
    indirectOffset: number,
  ): undefined;

  setViewport(
    x: number,
    y: number,
    width: number,
    height: number,
    minDepth: number,
    maxDepth: number,
  ): undefined;

  setScissorRect(
    x: number,
    y: number,
    width: number,
    height: number,
  ): undefined;

  setBlendConstant(color: GPUColor): undefined;
  setStencilReference(reference: number): undefined;

  beginOcclusionQuery(queryIndex: number): undefined;
  endOcclusionQuery(): undefined;

  executeBundles(bundles: GPURenderBundle[]): undefined;
  end(): undefined;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPURenderPassTimestampWrites {
  querySet: GPUQuerySet;
  beginningOfPassWriteIndex?: number;
  endOfPassWriteIndex?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPURenderPassDescriptor extends GPUObjectDescriptorBase {
  colorAttachments: (GPURenderPassColorAttachment | null)[];
  depthStencilAttachment?: GPURenderPassDepthStencilAttachment;
  occlusionQuerySet?: GPUQuerySet;
  timestampWrites?: GPURenderPassTimestampWrites;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPURenderPassColorAttachment {
  view: GPUTextureView;
  resolveTarget?: GPUTextureView;

  clearValue?: GPUColor;
  loadOp: GPULoadOp;
  storeOp: GPUStoreOp;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPURenderPassDepthStencilAttachment {
  view: GPUTextureView;

  depthClearValue?: number;
  depthLoadOp?: GPULoadOp;
  depthStoreOp?: GPUStoreOp;
  depthReadOnly?: boolean;

  stencilClearValue?: number;
  stencilLoadOp?: GPULoadOp;
  stencilStoreOp?: GPUStoreOp;
  stencilReadOnly?: boolean;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPULoadOp = "load" | "clear";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUStoreOp = "store" | "discard";

/**
 * @category GPU
 * @tags unstable
 */
declare class GPURenderBundle implements GPUObjectBase {
  label: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPURenderBundleDescriptor extends GPUObjectDescriptorBase {}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPURenderBundleEncoder
  implements GPUObjectBase, GPUProgrammablePassEncoder, GPURenderEncoderBase {
  label: string;
  draw(
    vertexCount: number,
    instanceCount?: number,
    firstVertex?: number,
    firstInstance?: number,
  ): undefined;
  drawIndexed(
    indexCount: number,
    instanceCount?: number,
    firstIndex?: number,
    baseVertex?: number,
    firstInstance?: number,
  ): undefined;
  drawIndexedIndirect(
    indirectBuffer: GPUBuffer,
    indirectOffset: number,
  ): undefined;
  drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined;
  insertDebugMarker(markerLabel: string): undefined;
  popDebugGroup(): undefined;
  pushDebugGroup(groupLabel: string): undefined;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup,
    dynamicOffsets?: number[],
  ): undefined;
  setBindGroup(
    index: number,
    bindGroup: GPUBindGroup,
    dynamicOffsetsData: Uint32Array,
    dynamicOffsetsDataStart: number,
    dynamicOffsetsDataLength: number,
  ): undefined;
  setIndexBuffer(
    buffer: GPUBuffer,
    indexFormat: GPUIndexFormat,
    offset?: number,
    size?: number,
  ): undefined;
  setPipeline(pipeline: GPURenderPipeline): undefined;
  setVertexBuffer(
    slot: number,
    buffer: GPUBuffer,
    offset?: number,
    size?: number,
  ): undefined;

  finish(descriptor?: GPURenderBundleDescriptor): GPURenderBundle;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPURenderPassLayout extends GPUObjectDescriptorBase {
  colorFormats: (GPUTextureFormat | null)[];
  depthStencilFormat?: GPUTextureFormat;
  sampleCount?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPURenderBundleEncoderDescriptor extends GPURenderPassLayout {
  depthReadOnly?: boolean;
  stencilReadOnly?: boolean;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUQueue implements GPUObjectBase {
  label: string;

  submit(commandBuffers: GPUCommandBuffer[]): undefined;

  onSubmittedWorkDone(): Promise<undefined>;

  writeBuffer(
    buffer: GPUBuffer,
    bufferOffset: number,
    data: BufferSource,
    dataOffset?: number,
    size?: number,
  ): undefined;

  writeTexture(
    destination: GPUImageCopyTexture,
    data: BufferSource,
    dataLayout: GPUImageDataLayout,
    size: GPUExtent3D,
  ): undefined;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUQuerySet implements GPUObjectBase {
  label: string;

  destroy(): undefined;

  readonly type: GPUQueryType;
  readonly count: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUQuerySetDescriptor extends GPUObjectDescriptorBase {
  type: GPUQueryType;
  count: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUQueryType = "occlusion" | "timestamp";

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUDeviceLostReason = "destroyed";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUDeviceLostInfo {
  readonly reason: GPUDeviceLostReason;
  readonly message: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUError {
  readonly message: string;
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUOutOfMemoryError extends GPUError {
  constructor(message: string);
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUValidationError extends GPUError {
  constructor(message: string);
}

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUInternalError extends GPUError {
  constructor(message: string);
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUErrorFilter = "out-of-memory" | "validation" | "internal";

/**
 * @category GPU
 * @tags unstable
 */
declare class GPUUncapturedErrorEvent extends EventTarget {
  constructor(
    type: string,
    gpuUncapturedErrorEventInitDict: GPUUncapturedErrorEventInit,
  );

  readonly error: GPUError;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUUncapturedErrorEventInit extends EventInit {
  error: GPUError;
}

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUColorDict {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUColor = number[] | GPUColorDict;

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUOrigin3DDict {
  x?: number;
  y?: number;
  z?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUOrigin3D = number[] | GPUOrigin3DDict;

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUExtent3DDict {
  width: number;
  height?: number;
  depthOrArrayLayers?: number;
}

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUExtent3D = number[] | GPUExtent3DDict;

/**
 * @category GPU
 * @tags unstable
 */
declare type GPUCanvasAlphaMode = "opaque" | "premultiplied";

/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUCanvasConfiguration {
  device: GPUDevice;
  format: GPUTextureFormat;
  usage?: GPUTextureUsageFlags;
  viewFormats?: GPUTextureFormat[];
  colorSpace?: "srgb" | "display-p3";
  alphaMode?: GPUCanvasAlphaMode;
  width: number;
  height: number;
}
/**
 * @category GPU
 * @tags unstable
 */
declare interface GPUCanvasContext {
  configure(configuration: GPUCanvasConfiguration): undefined;
  unconfigure(): undefined;
  getCurrentTexture(): GPUTexture;
}
