DECLARE @fileId As VARCHAR(max) = 'DD7C169D-0A79-4237-A965-DA4E903FD34B'

DELETE From [PlantLuv].[dbo].[File] WHERE FileId = @fileId
DELETE From [PlantLuv].[dbo].[FileImageAlternate] WHERE FileId = @fileId
DELETE From [PlantLuv].[dbo].[FileImageAlternateMetadata] WHERE FileId = @fileId
DELETE From [PlantLuv].[dbo].[FileMetadata] WHERE FileId = @fileId